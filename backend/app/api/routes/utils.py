import torch
from transformers import AutoTokenizer, AutoModel
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.data import find as nltk_find
from nltk import download
import nltk
import os
from PIL import Image
import numpy as np
import io
import base64
import random
from nltk.corpus import wordnet
from torchvision import transforms
from torch.nn.utils.rnn import pad_sequence
import json
import torch.nn as nn
# Set a custom directory for NLTK data
nltk_data_dir = os.path.expanduser('~/nltk_data')  # Change this to your desired path
if not os.path.exists(nltk_data_dir):
    os.makedirs(nltk_data_dir)

# Append the custom directory to NLTK's data path
nltk.data.path.append(nltk_data_dir)

# Download the required resources
nltk.download('punkt', download_dir=nltk_data_dir)
nltk.download('stopwords', download_dir=nltk_data_dir)
nltk.download('wordnet', download_dir=nltk_data_dir)



def tokenize_text(text):
    
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    tokens = tokenizer.tokenize(text)
    token_ids = tokenizer.convert_tokens_to_ids(tokens)

    return {"tokens": tokens, "token_ids": token_ids}

def padded_text(text, max_length):
    # Split the input text into sentences
    sentences = text.split('.')
    
    # Tokenizer initialization
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    
    # Tokenize and convert sentences to token IDs
    token_ids_list = []
    for sentence in sentences:
        tokens = tokenizer.tokenize(sentence.strip())
        token_ids = tokenizer.convert_tokens_to_ids(tokens)
        token_ids = token_ids[:max_length]  # Truncate if longer than max_length
        token_ids_list.append(token_ids)

    # Convert to tensor
    texts = [torch.tensor(token_ids) for token_ids in token_ids_list]
    
    # Pad the sequences
    texts_padded = pad_sequence(texts, batch_first=True, padding_value=tokenizer.pad_token_id)
    # Convert texts_padded tensor to a nested list and then to JSON string
    texts_padded_str = json.dumps(texts_padded.tolist())

    # Create labels (assuming labels are just the indices of sentences)
    labels = torch.tensor(range(len(sentences)))  # Example labels, adjust as needed
    

    return {"texts_padded": texts_padded_str, "padded_labels": labels.tolist()}

def embed_text(text):
    # Split the input text into sentences
    sentences = text.split('.')
    
    # Tokenizer and model initialization
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    model = AutoModel.from_pretrained("bert-base-uncased")
    
    # Tokenize and convert sentences to token IDs
    token_ids_list = []
    for sentence in sentences:
        tokens = tokenizer.tokenize(sentence.strip())
        token_ids = tokenizer.convert_tokens_to_ids(tokens)
        token_ids_list.append(token_ids)

    # Convert to tensor and pad the sequences
    texts = [torch.tensor(token_ids) for token_ids in token_ids_list]
    texts_padded = pad_sequence(texts, batch_first=True, padding_value=tokenizer.pad_token_id)

    # Pass the padded token IDs through the model to get embeddings
    with torch.no_grad():
        embeddings = model(texts_padded).last_hidden_state  # Use last hidden state as embeddings

    # Convert embeddings tensor to JSON-compatible format (nested list)
    embeddings_list = embeddings.tolist()
    
    return {"embeddings": embeddings_list}

def lower_case_remove_punctuation(text):
    return {"cleaned_text": text.lower().replace(".", "").replace(",", "").replace("!", "").replace("?", "")}

def stem_lemmatize(text):
    stemmer = PorterStemmer()
    lemmatizer = WordNetLemmatizer()

    words = word_tokenize(text)
    stemmed_words = [stemmer.stem(word) for word in words]
    lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
    # Join lists into readable strings
    stemmed_text = ' '.join(stemmed_words)
    lemmatized_text = ' '.join(lemmatized_words)

    return {"stemmed_text": stemmed_text, "lemmatized_text": lemmatized_text}

def stop_words_remove(text):
    

    stop_words = set(stopwords.words("english"))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word not in stop_words]
    return {"filtered_text": ' '.join(filtered_words)}

# todo: add preprocessing for image data
def resize_image(image_data, target_size):
    transform = transforms.Compose([
    transforms.Resize((128, 128)),              # Rotate image randomly up to 45 degrees
    transforms.ToTensor(),                                # Convert the image to a tensor
        ])
    resized_image = transform(image_data)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(resized_image, torch.Tensor):
        rotated_image = transforms.ToPILImage()(resized_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue()  # Return the byte data of the resized image

def normalize_image(image):
    transform = transforms.Compose([
    transforms.ToTensor(),            
    transforms.Normalize(mean=[0.5], std=[0.5]) # Convert the image to a tensor
        ])
    normalize_image = transform(image)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(normalize_image, torch.Tensor):
        rotated_image = transforms.ToPILImage()(normalize_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue()


def synonym_replacement(sentence, n=5):
    words = word_tokenize(sentence)
    replaced_words = words.copy()
    
    # Keep track of replaced words to avoid duplicates
    replaced_count = 0
    for _ in range(len(words) * 2):  # Run the loop to allow replacements, max tries
        if replaced_count >= n:  # Stop when n replacements are made
            break
        
        word_to_replace = random.choice(words)
        
        # Find synonyms for the word
        synonyms = wordnet.synsets(word_to_replace)
        synonym_words = [syn.lemmas()[0].name() for syn in synonyms if syn.lemmas()[0].name().lower() != word_to_replace.lower()]
        
        if synonym_words:  # Proceed only if there are synonyms available
            synonym = random.choice(synonym_words)
            replaced_words = [synonym if word == word_to_replace else word for word in replaced_words]
            replaced_count += 1  # Increment only when a replacement is made
    
    return {"synonym_replaced_text": ' '.join(replaced_words)}

def random_deletion(text, p=0.5):
    words = text.split()
    if len(words) > 1:
        word_to_delete = random.choice(words)
        words = [word for word in words if word != word_to_delete]
    return {"random_deleted_text": ' '.join(words)}

def random_swap(text, p=0.5):
    words = text.split()
    if len(words) > 1:
        word_to_swap = random.choice(words)
        words = [word_to_swap if word == random.choice(words) else word for word in words]
    return {"random_swapped_text": ' '.join(words)}

def random_insertion(text, p=0.5):
    words = text.split()
    if len(words) > 1:
        word_to_insert = random.choice(words)
        words = [word_to_insert if random.random() < 0.5 else word for word in words]
    return {"random_inserted_text": ' '.join(words)}

def rotation(image, degrees=15):
    # transform = transforms.RandomRotation(degrees)
    transform = transforms.Compose([
    transforms.RandomRotation(degrees=45),                # Rotate image randomly up to 45 degrees
    transforms.ToTensor(),                                # Convert the image to a tensor
])
    rotated_image = transform(image)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(rotated_image, torch.Tensor):
        rotated_image = transforms.ToPILImage()(rotated_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue()  # Return the image data

def zoom(image):
    transform = transforms.Compose([
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
    transforms.ToTensor(),                                # Convert the image to a tensor
            ])
    jittered_image = transform(image)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(jittered_image, torch.Tensor):
        rotated_image = transforms.ToPILImage()(jittered_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue()

def flip(image):
    transform = transforms.Compose([
    transforms.RandomVerticalFlip(p=0.5),              # Rotate image randomly up to 45 degrees
    transforms.ToTensor(),                                # Convert the image to a tensor
])
    flipped_image = transform(image)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(flipped_image, torch.Tensor):
            rotated_image = transforms.ToPILImage()(flipped_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue() # Return the image data
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
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    tokens = tokenizer.tokenize(text)
    token_ids = tokenizer.convert_tokens_to_ids(tokens)
    token_ids = token_ids[:max_length]  # Truncate if longer than max_length
    token_ids += [0] * (max_length - len(token_ids))  # Pad with zeros if shorter

    return {"padded_token_id": token_ids}

def embed_text(text):
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    model = AutoModel.from_pretrained("bert-base-uncased")
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    return {"embeddings": outputs.last_hidden_state}

def lower_case_remove_punctuation(text):
    return {"cleaned_text": text.lower().replace(".", "").replace(",", "").replace("!", "").replace("?", "")}

def stem_lemmatize(text):
    stemmer = PorterStemmer()
    lemmatizer = WordNetLemmatizer()

    words = word_tokenize(text)
    stemmed_words = [stemmer.stem(word) for word in words]
    lemmatized_words = [lemmatizer.lemmatize(word) for word in words]

    return {"stemmed_words": stemmed_words, "lemmatized_words": lemmatized_words}

def stop_words_remove(text):
    

    stop_words = set(stopwords.words("english"))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word not in stop_words]
    return {"filtered_words": filtered_words}

# todo: add preprocessing for image data
def resize_image(image_data, target_size):
    """
    Resize the input image to the target size.

    Parameters:
    - image_data: str (Data URL or base64 encoded image)
    - target_size: tuple (width, height)

    Returns:
    - Resized PIL Image object
    """
    # If the image_data is a Data URL, extract the base64 part
    if image_data.startswith('data:image/'):
        header, encoded = image_data.split(',', 1)
        image_data = base64.b64decode(encoded)
    
    # Convert the byte data to a PIL Image
    image = Image.open(io.BytesIO(image_data))
    
    # Resize the image
    resized_image = image.resize(target_size, Image.LANCZOS)
    
    # Optionally, convert the resized image back to a format you want to return
    output = io.BytesIO()
    resized_image.save(output, format='PNG')  # Save as PNG or any other format
    return output.getvalue()  # Return the byte data of the resized image

def normalize_image(image):
    """
    Normalize the input image to the range [0, 1].

    Parameters:
    - image: PIL Image object

    Returns:
    - Normalized numpy array
    """
    image_array = np.array(image)
    normalized_image = image_array / 255.0  # Normalize to [0, 1]
    return normalized_image


def synonym_replacement(sentence, n=5):
    words = sentence.split()
    for _ in range(n):
        word_to_replace = random.choice(words)
        synonyms = wordnet.synsets(word_to_replace)
        if synonyms:
            synonym = synonyms[0].lemmas()[0].name()
            words = [synonym if word == word_to_replace else word for word in words]
    
    return {"synonym_replaced_text": ' '.join(words)}

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
    transform = transforms.RandomRotation(degrees)
    rotated_image = transform(image)

    # Convert the rotated image back to a PIL Image if necessary
    if isinstance(rotated_image, torch.Tensor):
        rotated_image = transforms.ToPILImage()(rotated_image)

    # Convert the PIL Image to a format suitable for response (e.g., PNG)
    output = io.BytesIO()
    rotated_image.save(output, format='PNG')
    return output.getvalue()  # Return the image data

def zoom(image):
    transform = transforms.RandomResizedCrop(size=224, scale=(0.8, 1.0))
    zoomed_image = transform(image)

    # Convert the zoomed image back to a PIL Image if necessary
    if isinstance(zoomed_image, torch.Tensor):
        zoomed_image = transforms.ToPILImage()(zoomed_image)

    output = io.BytesIO()
    zoomed_image.save(output, format='PNG')
    return output.getvalue()  # Return the image data

def flip(image):
    transform = transforms.RandomHorizontalFlip(p=0.5)
    flipped_image = transform(image)

    # Convert the flipped image back to a PIL Image if necessary
    if isinstance(flipped_image, torch.Tensor):
        flipped_image = transforms.ToPILImage()(flipped_image)

    output = io.BytesIO()
    flipped_image.save(output, format='PNG')
    return output.getvalue()  # Return the image data
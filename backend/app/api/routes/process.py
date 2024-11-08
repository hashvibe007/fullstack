from fastapi import APIRouter, Body, Response
from pydantic import BaseModel
from .utils import tokenize_text, padded_text, embed_text, lower_case_remove_punctuation, stem_lemmatize, stop_words_remove, resize_image, normalize_image, synonym_replacement, random_deletion, random_swap, random_insertion, rotation, zoom, flip
from PIL import Image
import io
import base64
import numpy as np

router = APIRouter()

# Define a Pydantic model for the request body
class TokenizationRequest(BaseModel):
    text: str
    
class PaddedTextRequest(BaseModel):
    text: str
    max_length: int = 10

class EmbedTextRequest(BaseModel):
    text: str   

class LowerCaseRemovePunctuationRequest(BaseModel):
    text: str   

class StemLemmatizeRequest(BaseModel):
    text: str   

class StopWordsRemoveRequest(BaseModel):
    text: str   
    
class ResizeImageRequest(BaseModel):
    image: str
    target_size: tuple = (224, 224)

class NormalizeImageRequest(BaseModel):
    image: str
    
class SynonymReplacementRequest(BaseModel):
    text: str

class RandomDeletionRequest(BaseModel):
    text: str   

class RandomSwapRequest(BaseModel):
    text: str      

class RandomInsertionRequest(BaseModel):
    text: str             

class RotationRequest(BaseModel):
    image: str
    
class ZoomRequest(BaseModel):
    image: str

class FlipRequest(BaseModel):
    image: str

@router.post("/tokenization")
async def tokenization(request: TokenizationRequest):
    return tokenize_text(request.text)

@router.post("/padded_text")
async def padded_text_route(request: PaddedTextRequest):
    max_length = 10
    return padded_text(request.text, max_length)

@router.post("/embed_text")
async def embed_text_route(request: EmbedTextRequest):
    return embed_text(request.text)

@router.post("/lower_case_remove_punctuation")
async def lower_case_remove_punctuation_route(request: LowerCaseRemovePunctuationRequest):
    return lower_case_remove_punctuation(request.text)  

@router.post("/stem_lemmatize")
async def stem_lemmatize_route(request: StemLemmatizeRequest):
    return stem_lemmatize(request.text) 

@router.post("/stop_words_remove")
async def stop_words_remove_route(request: StopWordsRemoveRequest):
    return stop_words_remove(request.text)  



@router.post("/resize_image")
async def resize_image_route(request: ResizeImageRequest):
    try:
        resized_image_data = resize_image(request.image, request.target_size)
        return Response(content=resized_image_data, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}

@router.post("/normalize_image")
async def normalize_image_route(request: NormalizeImageRequest):
    try:
        # Decode the image from the Data URL
        if request.image.startswith('data:image/'):
            header, encoded = request.image.split(',', 1)
            image_data = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_data))
        
        # Normalize the image
        normalized_image = normalize_image(image)

        # Convert the normalized image back to a PIL Image
        normalized_image_pil = Image.fromarray((normalized_image * 255).astype(np.uint8))

        # Save the normalized image to a BytesIO object
        output = io.BytesIO()
        normalized_image_pil.save(output, format='PNG')
        return Response(content=output.getvalue(), media_type="image/png")
    except Exception as e:
        return {"error": str(e)}

# Augmentation
# Text Augmentation
# synonym_replacement
@router.post("/synonym_replacement")
async def synonym_replacement_route(request: SynonymReplacementRequest):
    return synonym_replacement(request.text)
# random_deletion
@router.post("/random_deletion")
async def random_deletion_route(request: RandomDeletionRequest):
    return random_deletion(request.text)

# random_swap
@router.post("/random_swap")
async def random_swap_route(request: RandomSwapRequest):
    return random_swap(request.text)
# random_insertion  
@router.post("/random_insertion")
async def random_insertion_route(request: RandomInsertionRequest):
    return random_insertion(request.text)
# Image Augmentation
# rotation  
@router.post("/rotation")
async def rotation_route(request: RotationRequest):
    try:
        # Decode the image from the Data URL
        if request.image.startswith('data:image/'):
            header, encoded = request.image.split(',', 1)
            image_data = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_data))
        

        # Normalize the image
        rotated_image = rotation(image)  # Pass the PIL image directly

        
        return Response(content=rotated_image, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}
# zoom
@router.post("/zoom")
async def zoom_route(request: ZoomRequest):
    try:
        # Decode the image from the Data URL
        if request.image.startswith('data:image/'):
            header, encoded = request.image.split(',', 1)
            image_data = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_data))
        
        # Normalize the image
        zoomed_image = zoom(image)

    
        return Response(content=zoomed_image, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}
# flip
@router.post("/flip")
async def flip_route(request: FlipRequest):
    try:    
        # Decode the image from the Data URL
        if request.image.startswith('data:image/'):
            header, encoded = request.image.split(',', 1)
            image_data = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_data))
        
        # Normalize the image
        flipped_image = flip(image)

       
        return Response(content=flipped_image, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}
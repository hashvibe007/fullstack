import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const AugmentationOptions = ({ fileType, onProcess, resetResult, fileContent }) => {
    const [augmentationOption, setAugmentationOption] = useState('');

    const handleOptionChange = (event) => {
        setAugmentationOption(event.target.value);
        resetResult(); // Clear previous results when a new option is selected
    };

    const handleProcessClick = async () => {
        if (augmentationOption && fileContent) {
            try {
                let endpoint = '';

                switch (augmentationOption) {
                    case 'synonym_replacement':
                        endpoint = 'synonym_replacement';
                        break;
                    case 'random_deletion':
                        endpoint = 'random_deletion';
                        break;
                    case 'random_swap':
                        endpoint = 'random_swap';
                        break;
                    case 'random_insertion':
                        endpoint = 'random_insertion';
                        break;
                    case 'rotation':
                        endpoint = 'rotation';
                        break;
                    case 'zoom':
                        endpoint = 'zoom';
                        break;
                    case 'flip':
                        endpoint = 'flip';
                        break;
                    default:
                        throw new Error('Invalid augmentation option selected.');
                }   
                const body = fileType === 'image'
                    ? { image: fileContent } // Assuming fileContent is a Data URL
                    : { text: fileContent };
                const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    const contentType = response.headers.get("Content-Type");
                    if (contentType && contentType.includes("image")) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        
                        // Assuming the API returns different images for resize and normalize
                        onProcess({
                            rotation_image: augmentationOption === 'rotation' ? imageUrl : null,
                            zoom_image: augmentationOption === 'zoom' ? imageUrl : null,
                            flip_image: augmentationOption === 'flip' ? imageUrl : null, 
                        });
                    } else {
                        const result = await response.json();
                        onProcess(result); // Handle JSON response
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error processing:', error);
            }
        }
    };
    return (
        <div>
            <RadioGroup value={augmentationOption} onChange={handleOptionChange}>
                {fileType === 'text' && (
                    <>
                        <FormControlLabel value="synonym_replacement" control={<Radio />} label="Synonym Replacement" />
                        <FormControlLabel value="random_deletion" control={<Radio />} label="Random Deletion" />
                        <FormControlLabel value="random_swap" control={<Radio />} label="Random Swap" />
                        <FormControlLabel value="random_insertion" control={<Radio />} label="Random Insertion" />
                    </>
                )}
                {fileType === 'image' && (
                    <>
                        <FormControlLabel value="rotation" control={<Radio />} label="Rotation" />
                        <FormControlLabel value="zoom" control={<Radio />} label="Color Jitter" />
                        <FormControlLabel value="flip" control={<Radio />} label="Flip" />
                    </>
                )}
            </RadioGroup>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleProcessClick} 
                disabled={!augmentationOption} // Disable if no option is selected
            >
                Augment
            </Button>
        </div>
    );
};

export default AugmentationOptions;

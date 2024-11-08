import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Button, Typography } from '@mui/material';

const ProcessingOptions = ({ fileType, onProcess, fileContent, resetResult }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        resetResult(); // Clear previous results when a new option is selected
    };

    const handleProcessClick = async () => {
        if (selectedOption && fileContent) {
            try {
                let endpoint = '';

                switch (selectedOption) {
                    case 'tokenization':
                        endpoint = 'tokenization';
                        break;
                    case 'padding':
                        endpoint = 'padded_text';
                        break;
                    case 'embedding':
                        endpoint = 'embed_text';
                        break;
                    case 'lower_case_remove_punctuation':
                        endpoint = 'lower_case_remove_punctuation';
                        break;
                    case 'stemming_lemmatization':
                        endpoint = 'stem_lemmatize';
                        break;
                    case 'stop_words_remove':
                        endpoint = 'stop_words_remove';
                        break;
                    case 'resize':
                        endpoint = 'resize_image';
                        break;
                    case 'normalize':
                        endpoint = 'normalize_image';
                        break;
                    default:
                        throw new Error('Invalid processing option selected.');
                }

                const body = selectedOption === 'resize' || selectedOption === 'normalize'
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
                        
                        onProcess({
                            resized_image: selectedOption === 'resize' ? imageUrl : null,
                            normalized_image: selectedOption === 'normalize' ? imageUrl : null,
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
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                {fileType === 'text' && (
                    <>
                        <FormControlLabel value="tokenization" control={<Radio />} label="Tokenization" />
                        <FormControlLabel value="padding" control={<Radio />} label="Padding" />
                        <FormControlLabel value="embedding" control={<Radio />} label="Embedding" />
                        <FormControlLabel value="lower_case_remove_punctuation" control={<Radio />} label="Lowercasing" />
                        <FormControlLabel value="stemming_lemmatization" control={<Radio />} label="Stemming and Lemmatization" />
                        <FormControlLabel value="stop_words_remove" control={<Radio />} label="Stop Words Removal" />
                    </>
                )}
                {fileType === 'image' && (
                    <>
                        <FormControlLabel value="resize" control={<Radio />} label="Resize" />
                        <FormControlLabel value="normalize" control={<Radio />} label="Normalize" />
                    </>
                )}
            </RadioGroup>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleProcessClick} 
                disabled={!selectedOption} // Disable if no option is selected
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
            >
                Preprocess
            </Button>
        </div>
    );
};

export default ProcessingOptions;
import React, { useState } from 'react';
import { Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const TextProcessing = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const processText = async () => {
        let endpoint = '';

        switch (selectedOption) {
            case 'stem_lemmatize':
                endpoint = 'stem_lemmatize';
                break;
            case 'padded_text':
                endpoint = 'padded_text';
                break;
            case 'embed_text':
                endpoint = 'embed_text';
                break;
            case 'lower_case_remove_punctuation':
                endpoint = 'lower_case_remove_punctuation';
                break;
            case 'stop_words_remove':
                endpoint = 'stop_words_remove';
                break;
            default:
                setError('Please select a processing option.');
                return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <TextField
                label="Input Text"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={handleInputChange}
                style={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Select Processing Option</InputLabel>
                <Select value={selectedOption} onChange={handleOptionChange}>
                    <MenuItem value="stem_lemmatize">Stemming & Lemmatization</MenuItem>
                    <MenuItem value="padded_text">Padding</MenuItem>
                    <MenuItem value="embed_text">Embedding</MenuItem>
                    <MenuItem value="lower_case_remove_punctuation">Lowercase & Remove Punctuation</MenuItem>
                    <MenuItem value="stop_words_remove">Stop Words Removal</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={processText}>
                Preprocess
            </Button>

            {result && (
                <div style={{ marginTop: '16px' }}>
                    <Typography variant="h6">Result:</Typography>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div style={{ marginTop: '16px', color: 'red' }}>
                    <Typography variant="h6">Error:</Typography>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default TextProcessing; 
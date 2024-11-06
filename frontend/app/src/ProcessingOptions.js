import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const ProcessingOptions = ({ fileType, onProcess }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleProcessClick = () => {
        if (selectedOption) {
            onProcess(selectedOption); // Call the processing function with the selected option
        }
    };

    return (
        <div>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                {fileType === 'text' && (
                    <>
                        <FormControlLabel value="tokenization" control={<Radio />} label="Tokenization" />
                        <FormControlLabel value="lemmatization" control={<Radio />} label="Lemmatization" />
                    </>
                )}
                {fileType === 'image' && (
                    <>
                        <FormControlLabel value="rotate" control={<Radio />} label="Rotate" />
                        <FormControlLabel value="invert" control={<Radio />} label="Invert" />
                    </>
                )}
                {/* Add more options for other file types as needed */}
            </RadioGroup>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleProcessClick} 
                disabled={!selectedOption} // Disable if no option is selected
            >
                Preprocess
            </Button>
        </div>
    );
};

export default ProcessingOptions; 
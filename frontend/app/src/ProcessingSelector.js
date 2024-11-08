import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ProcessingOptions from './ProcessingOptions';
import AugmentationOptions from './AugmentationOptions'; // New component for augmentation

const ProcessingSelector = ({ fileType, fileContent, resetResult, onProcess }) => {
    const [selectedType, setSelectedType] = useState(''); // State to hold the selected type
    const [selectedOption, setSelectedOption] = useState(''); // State to hold the selected processing option

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setSelectedOption(''); // Reset selected option when type changes
        resetResult(); // Clear previous results
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Select Processing Type</InputLabel>
                <Select
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <MenuItem value="">
                        
                    </MenuItem>
                    <MenuItem value="preprocessing">Preprocessing</MenuItem>
                    <MenuItem value="augmentation">Augmentation</MenuItem>
                </Select>
            </FormControl>

            {selectedType === 'preprocessing' && (
                <ProcessingOptions 
                    fileType={fileType} 
                    onProcess={onProcess} 
                    fileContent={fileContent} 
                    resetResult={resetResult} 
                />
            )}

            {selectedType === 'augmentation' && (
                <AugmentationOptions 
                    fileType={fileType} 
                    onProcess={onProcess} 
                    fileContent={fileContent} 
                    resetResult={resetResult} 
                />
            )}
        </div>
    );
};

export default ProcessingSelector;

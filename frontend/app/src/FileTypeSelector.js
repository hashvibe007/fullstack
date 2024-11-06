import React from 'react';

const FileTypeSelector = ({ fileType, onFileTypeChange }) => {
    const handleChange = (event) => {
        onFileTypeChange(event.target.value); // Call the parent function with the selected value
    };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="image"
                    checked={fileType === 'image'} // Check if this radio button is selected
                    onChange={handleChange}
                />
                Image
            </label>
            <label>
                <input
                    type="radio"
                    value="audio"
                    checked={fileType === 'audio'} // Check if this radio button is selected
                    onChange={handleChange}
                />
                Audio
            </label>
            <label>
                <input
                    type="radio"
                    value="text"
                    checked={fileType === 'text'} // Check if this radio button is selected
                    onChange={handleChange}
                />
                Text
            </label>
        </div>
    );
};

export default FileTypeSelector;

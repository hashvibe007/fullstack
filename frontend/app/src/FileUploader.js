import React from 'react';

const FileUploader = ({ onFileUpload, acceptedFileTypes }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            onFileUpload(file); // Pass the file to the parent component
        }
    };

    return (
        <input type="file" onChange={handleFileChange} accept={acceptedFileTypes} />
    );
};

export default FileUploader;

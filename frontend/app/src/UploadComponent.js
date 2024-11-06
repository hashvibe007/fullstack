import React, { useState } from 'react';
import { Button, Paper, Typography, Radio, RadioGroup, FormControlLabel, Grid, useTheme } from '@mui/material';

const UploadComponent = ({ fileType, onFileTypeChange, setFileContent }) => {
    const theme = useTheme(); // Access the theme
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleUpload = (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result); // Set the file content in the parent component
            };
            if (fileType === 'image') {
                reader.readAsDataURL(file); // Read as data URL for images
            } else if (fileType === 'text') {
                reader.readAsText(file); // Read as text for text files
            } else if (fileType === 'audio') {
                reader.readAsDataURL(file); // Read as data URL for audio files
            } else if (fileType === '3D') {
                reader.readAsArrayBuffer(file); // Example for 3D files
            }
        }
    };

    const handleFileTypeChange = (event) => {
        onFileTypeChange(event.target.value);
        setFileInputKey(Date.now());
        setFileContent(null); // Reset file content when file type changes
    };

    const getAcceptedFileTypes = () => {
        switch (fileType) {
            case 'text':
                return '.txt, .csv';
            case 'audio':
                return '.mp3, .wav, .ogg';
            case 'image':
                return '.jpg, .jpeg, .png, .gif';
            case '3D':
                return '.obj, .fbx, .stl';
            default:
                return '';
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: theme.spacing(4) }}>
                    <Typography variant="h6">Select File Type</Typography>
                    <RadioGroup value={fileType} onChange={handleFileTypeChange}>
                        <FormControlLabel value="text" control={<Radio />} label="Text" />
                        <FormControlLabel value="audio" control={<Radio />} label="Audio" />
                        <FormControlLabel value="image" control={<Radio />} label="Image" />
                        <FormControlLabel value="3D" control={<Radio />} label="3D" />
                    </RadioGroup>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{ padding: theme.spacing(2) }}>
                    <Typography variant="h6">Upload File</Typography>
                    <Grid container alignItems="center">
                        <Grid item>
                            <input 
                                type="file" 
                                accept={getAcceptedFileTypes()}
                                key={fileInputKey}
                                onChange={handleUpload} // Call handleUpload on file selection
                                style={{ marginRight: theme.spacing(2) }} 
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UploadComponent; 
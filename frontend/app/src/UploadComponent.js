import React, { useState } from 'react';
import { Button, Paper, Typography, Radio, RadioGroup, FormControlLabel, Grid, useTheme } from '@mui/material';

const UploadComponent = ({ fileType, onFileTypeChange, setFileContent, resetResult }) => {
    const theme = useTheme();
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const textContent = e.target.result;
                setFileContent(textContent);
            };

            if (fileType === 'text') {
                reader.readAsText(file);
            } else if (fileType === 'image') {
                reader.readAsDataURL(file);
            } else if (fileType === 'audio') {
                reader.readAsDataURL(file);
            }
        }
    };

    const handleFileTypeChange = (event) => {
        onFileTypeChange(event.target.value);
        setFileInputKey(Date.now());
        setFileContent(null);
        resetResult();
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
                        {/* <FormControlLabel value="audio" control={<Radio />} label="Audio" /> */}
                        <FormControlLabel value="image" control={<Radio />} label="Image" />
                        {/* <FormControlLabel value="3D" control={<Radio />} label="3D" /> */}
                    </RadioGroup>
                    <Grid container alignItems="center" style={{ marginTop: theme.spacing(2) }}>
                        <Grid item>
                            <input 
                                type="file" 
                                accept={getAcceptedFileTypes()}
                                key={fileInputKey}
                                onChange={handleUpload}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    component="span"
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
                                    Click to Upload
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UploadComponent;
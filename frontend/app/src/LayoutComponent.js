import React, { useState } from 'react';
import { Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import UploadComponent from './UploadComponent';
import ProcessingOptions from './ProcessingOptions';
import ProcessedDisplay from './ProcessedDisplay';
import FileContentDisplay from './FileContentDisplay';
import ProcessingSelector from './ProcessingSelector';

const LayoutComponent = () => {
    const [fileType, setFileType] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processingResult, setProcessingResult] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const onFileTypeChange = (newFileType) => {
        setFileType(newFileType);
    };

    const handleProcessing = (result) => {
        setProcessingResult(result);
    };

    const handleFileContentChange = (content) => {
        setFileContent(content);
        setIsFileUploaded(true);
    };

    const resetResult = () => {
        setProcessingResult(null); // Clear previous results
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: 16 }} align="center">
                    <Typography variant="h4">Data Processing & Augmentation</Typography>
                </Paper>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={2}>
                    <Paper style={{ padding: 16, height: '100%' }}>
                        <UploadComponent 
                            fileType={fileType} 
                            onFileTypeChange={onFileTypeChange} 
                            setFileContent={handleFileContentChange}
                            resetResult={resetResult} 
                        />
                        {isFileUploaded && (
                            <Card variant="outlined" style={{ marginBottom: 16 }}>
                                <CardContent>
                                    <ProcessingSelector 
                                        fileType={fileType} 
                                        fileContent={fileContent} 
                                        resetResult={resetResult} 
                                        onProcess={handleProcessing} 
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {isFileUploaded && (
                                <Card variant="outlined" style={{ marginBottom: 16 }}>
                                    <CardContent>
                                        <FileContentDisplay fileType={fileType} fileContent={fileContent} />
                                    </CardContent>
                                </Card>
                            )}
                            {processingResult && (
                                <Card variant="outlined">
                                    <CardContent>
                                        <ProcessedDisplay result={processingResult} />
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {/* Additional Information or other components can go here */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LayoutComponent;

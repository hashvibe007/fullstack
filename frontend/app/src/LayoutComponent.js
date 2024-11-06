import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import UploadComponent from './UploadComponent';
import FileContentDisplay from './FileContentDisplay';
import ProcessingOptions from './ProcessingOptions';
import ProcessedDisplay from './ProcessedDisplay';

const LayoutComponent = () => {
    const [fileType, setFileType] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processingResult, setProcessingResult] = useState(null);

    const onFileTypeChange = (newFileType) => {
        setFileType(newFileType);
    };

    const handleProcessing = (option) => {
        const result = `Processed with option: ${option}`;
        setProcessingResult(result);
    };

    return (
        <Grid container spacing={2}>
            {/* Header */}
            <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                    <Typography variant="h4">Header</Typography>
                </Paper>
            </Grid>

            {/* Main Layout */}
            <Grid container item xs={12}>
                {/* Left Sidebar */}
                <Grid item xs={2}>
                    <Paper style={{ padding: 16, height: '100%' }}>
                        <UploadComponent 
                            fileType={fileType} 
                            onFileTypeChange={onFileTypeChange} 
                            setFileContent={setFileContent}
                        />
                    </Paper>
                </Grid>

                {/* Main Content Area */}
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        {/* Left Half for File Content Display */}
                        <Grid item xs={6}>
                            <Paper style={{ padding: 16 }}>
                                <FileContentDisplay fileType={fileType} fileContent={fileContent} />
                                <ProcessingOptions 
                                    fileType={fileType} 
                                    onProcess={handleProcessing} 
                                />
                                {processingResult && (
                                    <ProcessedDisplay result={processingResult} />
                                )}
                            </Paper>
                        </Grid>

                        {/* Right Half for Additional Information or Future Use */}
                        <Grid item xs={6}>
                            <Paper style={{ padding: 16 }}>
                                <Typography variant="h6">Additional Information</Typography>
                                {/* You can add more content here if needed */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LayoutComponent; 
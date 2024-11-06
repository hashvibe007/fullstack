import React from 'react';
import { Paper, Typography } from '@mui/material';

const ProcessedDisplay = ({ result }) => {
    return (
        <Paper style={{ padding: 16, marginTop: 16 }}>
            <Typography variant="h6">Processed Result</Typography>
            <Typography variant="body1">{result}</Typography>
        </Paper>
    );
};

export default ProcessedDisplay; 
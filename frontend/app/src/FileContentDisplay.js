import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const FileContentDisplay = ({ fileType, fileContent }) => {
    const [isZoomed, setIsZoomed] = useState(false); // State to manage zoom level

    const handleImageClick = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state on image click
    };

    return (
        <Box marginTop={2}>
            {fileType === 'text' && fileContent && <Typography variant="body1">{fileContent}</Typography>}
            {fileType === 'image' && fileContent && (
                <img
                    src={fileContent}
                    alt="Uploaded"
                    onClick={handleImageClick} // Add click handler for zoom
                    style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        transition: 'transform 0.3s ease', // Smooth transition for zoom
                        transform: isZoomed ? 'scale(3)' : 'scale(1)', // Scale based on zoom state
                        cursor: 'pointer', // Change cursor to pointer for better UX
                    }}
                />
            )}
            {fileType === 'audio' && fileContent && <audio controls src={fileContent} />}
            {fileType === '3D' && fileContent && <Typography variant="body1">3D content is uploaded. (3D viewer not implemented)</Typography>}
        </Box>
    );
};

export default FileContentDisplay;

import React from 'react';
import { Paper, Typography, Chip, Box } from '@mui/material';

const ProcessedDisplay = ({ result }) => {
    if (!result) {
        return null; // Return null or a loading indicator if result is null
    }

    return (
        <Paper style={{ padding: 16, marginTop: 16 }}>
            <Typography variant="h6">Processed Result</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
                {result.tokens && (
                    <div>
                        <Typography variant="body1">Tokens:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.tokens.map((token, index) => (
                                <Chip key={index} label={token} />
                            ))}
                        </Box>
                    </div>
                )}
                {result.token_ids && (
                    <div>
                        <Typography variant="body1">Token IDs:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.token_ids.map((id, index) => (
                                <Chip key={index} label={id} />
                            ))}
                        </Box>
                    </div>
                )}
                {result.texts_padded && (
                    <div>
                        <Typography variant="body1">Padded Text:</Typography>
                        <Chip label={result.texts_padded} />
                    </div>
                )}
                {result.padded_labels && (
                    <div>
                        <Typography variant="body1">Padded Labels:</Typography>
                        <Chip label={result.padded_labels} />
                    </div>
                )}
                {result.embeddings && (
                    <div>
                        <Typography variant="body1">Embedded Vector:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.embeddings.map((embedding, index) => (
                                <Chip key={index} label={embedding} />
                            ))}
                        </Box>
                    </div>
                )}
                {result.cleaned_text && (
                    <div>
                        <Typography variant="body1">Lowercased Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.cleaned_text}
                        </Box>
                    </div>
                )}
                {result.stemmed_text && (
                    <div>
                        <Typography variant="body1">Stemmed Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.stemmed_text}
                        </Box>
                    </div>
                )}
                {result.lemmatized_text && (
                    <div>
                        <Typography variant="body1">Lemmatized Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.lemmatized_text
                            }
                        </Box>
                    </div>
                )}
                {result.filtered_text && (
                    <div>
                        <Typography variant="body1">Filtered Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.filtered_text}
                        </Box>
                    </div>
                )}
                {result.resized_image && (
                    <div>
                        <Typography variant="body1">Resized Image:</Typography>
                        <img 
                            src={result.resized_image}
                            alt="Resized" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                )}
                {result.normalized_image && (
                    <div>
                        <Typography variant="body1">Normalized Image:</Typography>
                        <img 
                            src={result.normalized_image}
                            alt="Normalized" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                )}
                {result.synonym_replaced_text && (
                    <div>
                        <Typography variant="body1">Synonym Replaced Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.synonym_replaced_text}
                        </Box>
                    </div>
                )}
                {result.random_deleted_text && (
                    <div>
                        <Typography variant="body1">Random Deleted Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.random_deleted_text}
                        </Box>
                    </div>
                )}
                {result.random_swapped_text && (
                    <div>
                        <Typography variant="body1">Random Swapped Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.random_swapped_text}
                        </Box>
                    </div>
                )}
                {result.random_inserted_text && (
                    <div>
                        <Typography variant="body1">Random Inserted Text:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {result.random_inserted_text}
                        </Box>
                    </div>
                )}
                {result.rotation_image && (
                    <div>
                        <Typography variant="body1">Rotated Image:</Typography>
                        <img 
                            src={result.rotation_image}
                            alt="Rotated" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                )}
                {result.zoom_image && (
                    <div>
                        <Typography variant="body1">Zoomed Image:</Typography>
                        <img 
                            src={result.zoom_image}
                            alt="Zoomed" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                )}
                {result.flip_image && (
                    <div>
                        <Typography variant="body1">Flipped Image:</Typography>
                        <img 
                            src={result.flip_image}
                            alt="Flipped" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                )}
            </Box>
        </Paper>
    );
};

export default ProcessedDisplay; 
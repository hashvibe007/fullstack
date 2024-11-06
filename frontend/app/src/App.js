import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LayoutComponent from './LayoutComponent';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    spacing: 8,
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <LayoutComponent />
        </ThemeProvider>
    );
};

export default App; 
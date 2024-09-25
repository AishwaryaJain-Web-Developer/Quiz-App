// src/components/Home.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Home = ({ onStart }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/24/20/77/360_F_524207725_cDk3moNgO4NYGQpogqLpoOWANpc9vzCF.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    // bgcolor: 'white',
                    color: "white",
                    opacity: 0.8,
                    borderRadius: 2,
                    padding: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome to the Quiz!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Let's test your knowledge!
                </Typography>
                <Button variant="contained" color="primary" onClick={onStart}>
                    Start Quiz
                </Button>
            </Box>
        </Box>
    );
};

export default Home;

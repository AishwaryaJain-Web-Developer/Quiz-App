import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const Quiz = ({ onRestart }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch quiz questions from Open Trivia API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
                const formattedQuestions = response.data.results.map((question) => ({
                    question: question.question,
                    options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                    answer: question.correct_answer,
                }));
                setQuestions(formattedQuestions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz questions:', error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleOptionClick = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/24/20/77/360_F_524207725_cDk3moNgO4NYGQpogqLpoOWANpc9vzCF.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 3,
            }}
        >
            {loading ? (
                <Typography variant="h6" color='White'>Loading...</Typography>
            ) : showScore ? (
                <Box sx={{ color: 'white', padding: 4, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Your score: {score} out of {questions.length}</Typography>
                    <Button variant="contained" color="primary" onClick={onRestart}>
                        Go Back to Home
                    </Button>
                </Box>
            ) : (
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        width: '80%',
                        maxWidth: '600px',
                        borderRadius: 2,
                        backgroundColor: '#0f3057',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    {/* Question Box */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                        {questions[currentQuestionIndex]?.question}
                    </Typography>

                    {/* Answer Options */}
                    {questions[currentQuestionIndex]?.options.map((option, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{
                                borderColor: '#f5a623',
                                color: 'white',
                                marginBottom: 2,
                                '&:hover': {
                                    backgroundColor: '#f5a623',
                                    color: '#0f3057',
                                },
                            }}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </Button>
                    ))}

                    {/* Navigation */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                        {currentQuestionIndex > 0 && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#f5a623',
                                    color: '#0f3057',
                                    '&:hover': {
                                        backgroundColor: '#ff9800',
                                    },
                                }}
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            >
                                Previous
                            </Button>
                        )}
                        {currentQuestionIndex < questions.length - 1 && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#f5a623',
                                    color: '#0f3057',
                                    '&:hover': {
                                        backgroundColor: '#ff9800',
                                    },
                                }}
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default Quiz;

// src/App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';

const App = () => {
    const [isQuizActive, setIsQuizActive] = useState(false);

    const startQuiz = () => {
        setIsQuizActive(true);
    };

    const restartQuiz = () => {
        setIsQuizActive(false);
    };

    return (
        <div className="App">
            {isQuizActive ? <Quiz onRestart={restartQuiz} /> : <Home onStart={startQuiz} />}
        </div>
    );
};

export default App;

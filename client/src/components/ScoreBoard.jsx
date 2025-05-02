import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const ScoreBoard = () => {
    const { playerScore, computerScore } = useContext(GameContext);

    return (
        <div className="scoreboard">
            <h1>Scoreboard</h1>
            <p>Player Score: {playerScore}</p>
            <p>Computer Score: {computerScore}</p>
        </div>
    );
};

export default ScoreBoard;
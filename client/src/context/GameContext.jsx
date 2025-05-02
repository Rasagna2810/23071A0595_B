import React, { createContext, useState, useContext, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [scores, setScores] = useState({ player: 0, computer: 0 });
    const [gameStatus, setGameStatus] = useState('waiting'); // 'waiting', 'playing', 'finished'
    const [deck, setDeck] = useState(generateDeck()); // Initialize the deck of cards
    const [stats, setStats] = useState({ playerWinRate: 0, computerWinRate: 0 });

    // Fetch scores from the backend
    const fetchScores = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/scores');
            if (!response.ok) throw new Error('Failed to fetch scores');
            const data = await response.json();
            console.log('Fetched scores:', data);
            if (data.length > 0) {
                setScores({
                    player: data[0].playerWins,
                    computer: data[0].computerWins,
                });
            }
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    // Fetch statistics from the backend
    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/stats');
            if (!response.ok) throw new Error('Failed to fetch statistics');
            const data = await response.json();
            console.log('Fetched statistics:', data);
            setStats(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    // Play a round and update scores
    const playRound = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/play', {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to play round');
            const data = await response.json();
            console.log('Round result:', data);

            // Update scores locally
            if (data.winner === 'Player') {
                setScores((prevScores) => ({
                    ...prevScores,
                    player: prevScores.player + 1,
                }));
            } else if (data.winner === 'Computer') {
                setScores((prevScores) => ({
                    ...prevScores,
                    computer: prevScores.computer + 1,
                }));
            }

            return data; // Return the round result
        } catch (error) {
            console.error('Error playing round:', error);
        }
    };

    const resetGame = () => {
        console.log('Resetting game...');
        setScores({ player: 0, computer: 0 });
        setGameStatus('waiting');
        const newDeck = generateDeck();
        console.log('New deck generated:', newDeck);
        setDeck(newDeck);
    };

    const drawCard = () => {
        console.log('Deck before drawing:', deck);
        if (deck.length === 0) {
            console.log('Deck is empty');
            return null;
        }
        const card = deck[0];
        console.log('Card drawn:', card);
        setDeck((prevDeck) => prevDeck.slice(1));
        return card;
    };

    useEffect(() => {
        fetchScores(); // Fetch scores when the app loads
        fetchStats(); // Fetch statistics when the app loads
    }, []);

    return (
        <GameContext.Provider
            value={{
                scores,
                stats,
                gameStatus,
                updateScores: fetchScores,
                resetGame,
                deck,
                drawCard,
                playRound,
                playerScore: scores.player,
                computerScore: scores.computer,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// Helper function to generate a deck of cards
const generateDeck = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = Array.from({ length: 13 }, (_, i) => i + 1); // 1 to 13
    const deck = [];
    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({ suit, value });
        });
    });
    return shuffle(deck);
};

// Helper function to shuffle the deck
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

// Custom hook to use the GameContext
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
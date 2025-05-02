const Score = require('../models/Score');

// Function to play a round of the card game
exports.playRound = async (req, res) => {
    try {
        const playerCard = drawCard();
        const computerCard = drawCard();
        const winner = determineWinner(playerCard, computerCard);

        await updateScores(winner);
        const scores = await Score.findOne();
        res.status(200).json({ playerCard, computerCard, winner, scores });

    } catch (error) {
        res.status(500).json({ message: 'Error playing round', error });
    }
};

// Function to get the current scores
exports.getScores = async (req, res) => {
    try {
        const scores = await Score.findOne();
        if (!scores) {
            return res.status(404).json({ message: 'No scores found' });
        }
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving scores', error });
    }
};

// Function to add a new score manually (optional)
exports.addScore = async (req, res) => {
    try {
        const { playerWins, computerWins, ties, totalGames } = req.body;
        const newScore = new Score({ playerWins, computerWins, ties, totalGames });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: 'Error adding score', error });
    }
};

// Function to get win/loss statistics
exports.getStats = async (req, res) => {
    try {
        const scores = await Score.findOne();
        if (!scores) {
            return res.status(404).json({ message: 'No scores found' });
        }

        const totalGames = scores.playerWins + scores.computerWins + scores.ties;
        const playerWinRate = ((scores.playerWins / totalGames) * 100).toFixed(2);
        const computerWinRate = ((scores.computerWins / totalGames) * 100).toFixed(2);
        const tieRate = ((scores.ties / totalGames) * 100).toFixed(2);

        res.status(200).json({ playerWinRate, computerWinRate, tieRate });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving statistics', error });
    }
};

// Helper functions
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = Array.from({ length: 13 }, (_, i) => i + 1);

const drawCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
};

const determineWinner = (playerCard, computerCard) => {
    if (playerCard.value > computerCard.value) return 'Player';
    if (playerCard.value < computerCard.value) return 'Computer';
    return 'Tie';
};

const updateScores = async (winner) => {
    const update = { $inc: { totalGames: 1 } };

    if (winner === 'Player') update.$inc.playerWins = 1;
    else if (winner === 'Computer') update.$inc.computerWins = 1;
    else if (winner === 'Tie') update.$inc.ties = 1;

    await Score.updateOne({}, update, { upsert: true });
};

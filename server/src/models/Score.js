const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    playerWins: {
        type: Number,
        required: true,
        default: 0
    },
    computerWins: {
        type: Number,
        required: true,
        default: 0
    },
    totalGames: {
        type: Number,
        required: true,
        default: 0
    },
    ties: {
        type: Number,
        required: true,
        default: 0
      }
      
}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
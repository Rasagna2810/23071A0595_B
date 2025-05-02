const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Route to get all scores
router.get('/scores', gameController.getScores);

// Route to add a new score
router.post('/scores', gameController.addScore);

// Route to get win/loss statistics
router.get('/stats', gameController.getStats);

// Route to play a round
router.post('/play', gameController.playRound);

module.exports = router;

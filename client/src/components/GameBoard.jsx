import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import StatsChart from './statsChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameBoard = () => {
  const { scores,playerScore, computerScore, playRound, resetGame } = useGameContext();
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [winner, setWinner] = useState('');
  const [totalRounds, setTotalRounds] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalWinner, setFinalWinner] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const startGame = () => {
    resetGame();
    setCurrentRound(0);
    setFinalWinner('');
    setWinner('');
    setPlayerCard(null);
    setComputerCard(null);
    setGameStarted(true);
    setIsGameOver(false); // Reset game over state
  };

  const handlePlayRound = async () => {
    if (currentRound >= totalRounds || finalWinner) return;

    const result = await playRound();
    if (result) {
      setPlayerCard(result.playerCard);
      setComputerCard(result.computerCard);
      setWinner(result.winner);
      setCurrentRound((prev) => prev + 1);
    }

    if (currentRound + 1 === totalRounds) {
      setTimeout(() => {
        if (playerScore > computerScore) setFinalWinner('Player');
        else if (computerScore > playerScore) setFinalWinner('Computer');
        else setFinalWinner('Tie');
        setIsGameOver(true);
      }, 300); // small delay to allow scores to update
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setTotalRounds(0);
    setCurrentRound(0);
    setFinalWinner('');
    setWinner('');
    setPlayerCard(null);
    setComputerCard(null);
    setGameStarted(false);
    setIsGameOver(false); // Reset game over state to show round selection
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Card Clash</h1>
        <p style={styles.subtitle}>Flip cards and beat the computer!</p>
      </header>
      {(gameStarted || isGameOver) && (
  <p >
    Round {Math.min(currentRound + 1, totalRounds)} of {totalRounds}
  </p>
)}

      {/* Round Selector */}
     

      {/* Layout: Game on left, Report on right */}
      <div style={styles.mainWrapper}>
        {/* Game Section */}
        <div
          style={{
            ...styles.gameSection,
            opacity: isGameOver ? 0.5 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
           {!gameStarted && !isGameOver && (
        <div style={{ marginBottom: '20px' }}>
          <label className='mb-3'>
            Select Rounds:&nbsp;
            <select
              value={totalRounds}
              onChange={(e) => setTotalRounds(Number(e.target.value))}
              style={styles.selectBox} 
            >
              <option value={0}>-- Choose --</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={7}>7</option>
            </select>
          </label>
        </div>
      )}
          {/* Only show cards after the game has started */}
          {gameStarted && !isGameOver ? (
            <>
              {/* Cards Area */}
              <div style={styles.cardArea}>
                <div style={styles.cardSlot}>
                  {playerCard ? <Card card={playerCard} /> : <div style={styles.cardPlaceholder} />}
                </div>
                <div style={styles.vsLabel}>VS</div>
                <div style={styles.cardSlot}>
                  {computerCard ? <Card card={computerCard} /> : <div style={styles.cardPlaceholder} />}
                </div>
              </div>

              {/* Winner Announcement */}
              <p style={styles.winnerDisplay} className="small">
                Winner: <strong>{winner || 'None yet'}</strong>
              </p>

              {/* Play Button */}
              <button
                style={styles.playButton}
                onClick={handlePlayRound}
                disabled={!gameStarted || finalWinner}
              >
                Play Round
              </button>
            </>
          ) : (
            // Display this when game has not started
            <button style={styles.playButton} onClick={startGame}>
              Start Game
            </button>
          )}

          {/* Final Winner Display */}
          {finalWinner && (
            <>
              <p style={{ fontSize: '20px', color: '#1976d2' }} className="small">
                Final Winner: <strong>{finalWinner}</strong>
              </p>
              <button style={styles.playButton} onClick={handlePlayAgain}>
                Play Again
              </button>
            </>
          )}
        </div>

        {/* Report Section */}
        <div style={styles.reportSection}>
          <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
          <StatsChart wins={scores.player} losses={scores.computer} ties={0} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    margin: '0 auto',
    // marginTop: '20px',
    // fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    fontSize: '20px',
  },
  header: {
    marginBottom: '80px',
    padding: '20px',
    background: 'linear-gradient(to right, rgb(28, 64, 155), rgba(28, 64, 155, 0.52))',
    borderRadius: '10px',
  },
  title: {
    fontSize: '36px',
    margin: 0,
    color: '#333',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '18px',
    color: 'white',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '30px',
  },
  gameSection: {
    flex: 1,
    textAlign: 'center',
  },
  reportSection: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
  },
  cardSlot: {
    width: '200px',
    height: '290px',
    border: '4px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  winnerDisplay: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  playButton: {
    padding: '10px 20px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    marginBottom: '30px',
  },
  vsLabel: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
  },
  cardPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    borderRadius: '10px',
  },
  selectBox: {
    padding: '8px 25px',
    fontSize: '20px',
    borderRadius: '5px',
    // backgroundColor: '#f0f8ff',
    // color: '#333',
    outline: 'none',
    transition: 'border 0.3s ease',
    cursor: 'pointer',
  },
  
};

export default GameBoard;

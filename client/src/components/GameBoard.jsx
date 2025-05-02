import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import StatsChart from './statsChart';

const GameBoard = () => {
  const { playerScore, computerScore, playRound, resetGame } = useGameContext();
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const handlePlayRound = async () => {
    const result = await playRound();
    if (result) {
      setPlayerCard(result.playerCard);
      setComputerCard(result.computerCard);
      setWinner(result.winner);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Card Clash</h1>
        <p style={styles.subtitle}>Flip cards and beat the computer!</p>
      </header>

      {/* Layout: Game on left, Report on right */}
      <div style={styles.mainWrapper}>
        {/* Game Section */}
        <div style={styles.gameSection}>
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
          <p style={styles.winnerDisplay}>
            Winner: <strong>{winner || 'None yet'}</strong>
          </p>

          {/* Play Button */}
          <button style={styles.playButton} onClick={handlePlayRound}>
            Play Round
          </button>
        </div>

        {/* Report Section */}
        <div style={styles.reportSection}>
          <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
          <StatsChart wins={playerScore} losses={computerScore} ties={0} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    margin: '0 auto',
    // padding: '30px',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
  header: {
    marginBottom: '30px',
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
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    marginBottom: '30px',
  },
};

export default GameBoard;

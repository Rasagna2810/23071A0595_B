import React from 'react';

const Card = ({ card, faceUp = true, onClick }) => {
  if (!faceUp) {
    return (
      <div 
        onClick={onClick} 
        style={{
          width: '200px',
          height: '300px',
          background: '#2c3e50',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          border: '2px solid #fff',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          margin: '10px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>♠♥♦♣</div>
          <div style={{ marginTop: '10px' }}>CARD</div>
        </div>
      </div>
    );
  }

  const getColor = (suit) => {
    return suit === '♥' || suit === '♦' ? '#d32f2f' : '#212121';
  };

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return suit;
    }
  };

  const getRankDisplay = (rank) => {
    switch (rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return rank;
    }
  };

  const suitSymbol = getSuitSymbol(card.suit);
  const color = getColor(suitSymbol);

  return (
    <div 
      onClick={onClick}
      style={{
        width: '300px',
        height: '275px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: color,
        border: '1px solid #ddd',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        margin: '10px',
        transition: 'transform 0.2s'
      }}
    >
      <div style={{ fontSize: '24px', alignSelf: 'flex-start' }}>
        {getRankDisplay(card.rank)}
      </div>
      
      <div style={{ fontSize: '48px', alignSelf: 'center' }}>
        {suitSymbol}
      </div>
      
      <div style={{ fontSize: '24px', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
        {getRankDisplay(card.rank)}
      </div>
    </div>
  );
};

export default Card;
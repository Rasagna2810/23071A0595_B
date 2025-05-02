import React from 'react';
// import { useGameContext } from '../context/GameContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatsChart = ({ wins, losses, ties }) => {
  const data = [
    { name: 'Wins', value: wins },
    { name: 'Losses', value: losses },
    { name: 'Ties', value: ties }
  ].filter(item => item.value > 0);

  const COLORS = ['#4CAF50', '#F44336', '#FFC107'];
  
  if (data.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>No game data yet</h3>
        <p>Play some games to see your statistics!</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip formatter={(value) => [`${value} games`, 'Count']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
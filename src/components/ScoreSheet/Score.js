import React from 'react'

export const Score = ({tempScore, value, status}) => {
  console.log('cell');
  return <td className={`score-item${status}`}>
    {value}
    <span className="temp-score">{tempScore}</span>
  </td>
};

export default Score

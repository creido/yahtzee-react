import React from 'react';

export const ScoreHeaderColumn = ({name, isActive}) => {
  const status = isActive ? ' is-active' : '';

  return <th
    className={`score-heading-col${status}`}
    scope="col">{name}</th>
};

export default ScoreHeaderColumn

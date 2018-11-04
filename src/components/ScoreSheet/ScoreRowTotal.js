import React from 'react'

import Score from './Score'

export const ScoreRowTotal = ({activePlayer, name, totals}) => <tr>
  <th className="score-heading-row" scope="row">
    {name}
  </th>
  {totals && totals.map((value, i) => {
    const status = i === activePlayer ? ' score-total is-active' : ' score-total';

    return <Score key={i} value={value} status={status}/>
  })}
</tr>;

export default ScoreRowTotal

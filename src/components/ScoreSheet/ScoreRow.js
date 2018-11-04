import React, {Component} from 'react';

import Score from './Score';

class ScoreRow extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.tempScore !== this.props.tempScore ||
      nextProps.score !== this.props.score ||
      nextProps.activePlayer !== this.props.activePlayer);
  }

  render() {
    const {name, tempScore, score, onScoreRowClick, activePlayer} = this.props;

    console.log(tempScore)

    return <tr
      className="score-row"
      onClick={() => onScoreRowClick(name)}>
      <th className="score-heading-row" scope="row">
        {name}
      </th>

      {score.map((value, i) => {
          let status = value === null ? 'can-score' : '';

          if (i === activePlayer) {
            status += ' is-active';
          }

          return <Score key={i} tempScore={tempScore} value={value} status={status} />
        }
      )}
    </tr>
  }
}

export default ScoreRow

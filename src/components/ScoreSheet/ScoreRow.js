import React, {Component} from 'react';
import {connect} from 'react-redux';

import Score from './Score';
import {addScore} from "../../reducers/scores";

// TODO: consolidate with ScoreRowTotal - use render prop, HOC or Hook to add click functionality
class ScoreRow extends Component {

  // TODO: use recompose or Hooks and functional component instead of shouldComponentUpdate and class
  shouldComponentUpdate(nextProps) {
    return (nextProps.tempScore !== this.props.tempScore ||
      nextProps.score !== this.props.score ||
      nextProps.activePlayer !== this.props.activePlayer);
  }

  render() {
    const {name, tempScore, score, onScoreRowClick, activePlayer} = this.props;

    console.log(tempScore);

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

export default connect(
  null,
  {onScoreRowClick: addScore}
)(ScoreRow)

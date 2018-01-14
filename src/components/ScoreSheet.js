import React from 'react';
import {connect} from 'react-redux';

import {addScore} from '../reducers/scores';

const mapStateToProps = state => ({scores: state.scores});

const Score = ({value}) => (<td className="score-item">{value}</td>);

const ScoreRow = ({name, description, score, onScoreRowClick}) => {
  return <tr
    className="score-row" onClick={() => onScoreRowClick(name)}>
    <th className="score-heading-row" scope="row">{name}</th>
    {score.map((value, i) =>
      <Score key={i} value={value} />
    )}
  </tr>;
};

const ScoreRowTotal = ({name, total}) => {
  const totalHeading = typeof name !== 'undefined'
    ? ` ${name.toLowerCase()}`
    : '';

  return <tr>
    <th className="score-heading-row" scope="row">Total{totalHeading}</th>
    {total && total.map((value, i) =>
      <Score key={i} value={value} />
    )}
  </tr>;
};

const ScoreSheet = ({scores, onScoreRowClick}) => {
  return <table className="score-sheet">
    <thead>
      <tr>
        <th className="score-heading-col"></th>
        <th className="score-heading-col" scope="col">Player 1</th>
        <th className="score-heading-col" scope="col">Player 2</th>
        <th className="score-heading-col" scope="col">Player 3</th>
        <th className="score-heading-col" scope="col">Player 4</th>
      </tr>
    </thead>


    <tbody>
      {scores.items.map((item, i) =>
        <ScoreRow
          key={i}
          onScoreRowClick={onScoreRowClick}
          {...item} />
      )}
    </tbody>

    <tfoot>
      {
        <ScoreRowTotal {...scores} />
      }
    </tfoot>

  </table>
};


/**
 *               | Player 1 | Player 2 | Player 3 | Player 4 |
 * ones          |    X     |    X     |    X     |    X     |
 * twos          |    X     |    X     |    X     |    X     |
 * threes        |    X     |    X     |    X     |    X     |
 * fours         |    X     |    X     |    X     |    X     |
 * fives         |    X     |    X     |    X     |    X     |
 * sixes         |    X     |    X     |    X     |    X     |
 *
 * total         |    X     |    X     |    X     |    X     |
 * bonus         |    X     |    X     |    X     |    X     |
 *
 * -----------------------------------------------------------
 * 3 of a kind   |    X     |    X     |    X     |    X     |
 * 4 of a kind   |    X     |    X     |    X     |    X     |
 * yahtzee       |    X     |    X     |    X     |    X     |
 * yahtzee count |    X     |    X     |    X     |    X     |
 * chance        |    X     |    X     |    X     |    X     |
 *
 * total         |    X     |    X     |    X     |    X     |
 *
 *
 * grand total   |    X     |    X     |    X     |    X     |
 */

export default connect(
  mapStateToProps,
  {
    onScoreRowClick: addScore
  }
)(ScoreSheet);

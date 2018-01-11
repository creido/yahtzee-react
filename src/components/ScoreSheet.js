import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({scores: state.scores});

const Score = ({value}) => (<td>{value}</td>);

const ScoreRow = ({name, description, score}) => {
  return <tr>
    <th scope="row">{name}</th>
    {score.map((value, i) =>
      <Score key="i" value={value} />
    )}
  </tr>;
};

const ScoreRowTotal = ({name, total}) => {
  const totalHeading = typeof name !== 'undefined'
    ? ` ${name.toLowerCase()}`
    : '';

  return <tr>
    <th scope="row">Total{totalHeading}</th>
    {total.map((value, i) =>
      <Score key="i" value={value} />
    )}
  </tr>;
};

const ScoreGroup = ({name, items, total, bonus}) => {
  return <tbody>
    {items.map((row, i) =>
      <ScoreRow key={i} {...row} />
    )}
    {<ScoreRowTotal name={name} total={total} />}

  </tbody>;
};

const ScoreSheet = ({scores}) => {
  return <table className="score-sheet">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Player 1</th>
        <th scope="col">Player 2</th>
        <th scope="col">Player 3</th>
        <th scope="col">Player 4</th>
      </tr>
    </thead>

    {scores.groups.map((group, i) => <ScoreGroup key={i} {...group} />)}
    <tfoot>{<ScoreRowTotal {...scores} />}</tfoot>

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
  mapStateToProps
)(ScoreSheet);

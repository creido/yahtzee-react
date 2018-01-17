import React from 'react';
import {connect} from 'react-redux';

import {addScore} from '../reducers/scores';

const mapStateToProps = state => (
  {
    gamePlay: state.gamePlay,
    scores: state.scores
  }
);

const Score = ({isTemp, tempScore, value, isActive}) => {
  return <td className={`score-item${isActive}`}>
    {value}
    <span className="temp-score">{tempScore}</span>
  </td>
};

const ScoreRow = ({name, description, tempScore, score, onScoreRowClick, activePlayer}) => {
  return <tr
    className="score-row"
    onClick={() => onScoreRowClick(name)}>
      <th className="score-heading-row" scope="row">
        {name}
      </th>

      {score.map((value, i) => {
          const isActive = i === activePlayer ? ' is-active' : '';
          return <Score key={i} tempScore={tempScore} value={value} isActive={isActive} />
        }
      )}
    </tr>;
};

const ScoreRowTotal = ({name, total}) => {
  const totalHeading = typeof name !== 'undefined'
    ? ` ${name.toLowerCase()}`
    : '';

  return <tr>
    <th className="score-heading-row" scope="row">
      Total{totalHeading}
    </th>
    {total && total.map((value, i) =>
      <Score key={i} value={value} />
    )}
  </tr>;
};

const ScoreHeaderColumn = ({name, isActive}) => {
  const headerClass = isActive ? ' is-active' : '';

  return <th
    className={`score-heading-col${headerClass}`}
    scope="col">{name}</th>
};

const ScoreSheet = ({gamePlay, scores, onScoreRowClick}) => {
  return <div className="scores">

    <table className="score-sheet">
      <thead>
        <tr>
          <ScoreHeaderColumn />

          {gamePlay.players.map((player, i) =>
            <ScoreHeaderColumn key={i} {...player} />
          )}

        </tr>
      </thead>

      <tbody>
        {scores.items.map((item, i) =>
          <ScoreRow
            key={i}
            onScoreRowClick={onScoreRowClick}
            {...item}
            {...gamePlay} />
        )}
      </tbody>

      <tfoot>
        {
          <ScoreRowTotal {...scores} />
        }
      </tfoot>

    </table>
  </div>
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
 * bonus (+35)   |    X     |    X     |    X     |    X     |
 *
 * -----------------------------------------------------------
 * 3 of a kind   |    X     |    X     |    X     |    X     |
 * 4 of a kind   |    X     |    X     |    X     |    X     |
 * low straight  |    X     |    X     |    X     |    X     |
 * high straight |    X     |    X     |    X     |    X     |
 * full house    |    X     |    X     |    X     |    X     |
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

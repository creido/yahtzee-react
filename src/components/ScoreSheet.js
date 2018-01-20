import React from 'react';
import {connect} from 'react-redux';

import {MAX_ROLLS} from '../lib/settings';
import {addScore} from '../reducers/scores';

const mapStateToProps = state => (
  {
    gamePlay: state.gamePlay,
    scores: state.scores
  }
);

const Score = ({isTemp, tempScore, value, status}) => {
  return <td className={`score-item${status}`}>
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
        let status = value === null ? ' can-score' : '';

        if (i === activePlayer) {
          status += ' is-active';
        }

        return <Score key={i} tempScore={tempScore} value={value} status={status} />
      }
    )}
  </tr>
};

const ScoreRowTotal = ({activePlayer, name, totals}) => <tr>
  <th className="score-heading-row" scope="row">
    {name}
  </th>
  {totals && totals.map((value, i) => {
    const status = i === activePlayer ? ' score-total is-active' : ' score-total';

    return <Score key={i} value={value} status={status}/>
  })}
</tr>;

const ScoreHeaderColumn = ({name, isActive}) => {
  const status = isActive ? ' is-active' : '';

  return <th
    className={`score-heading-col${status}`}
    scope="col">{name}</th>
};

const ScoreSheet = ({gamePlay, scores, onScoreRowClick}) => {
  const status = gamePlay.roll === MAX_ROLLS ? ' can-score' : '';

  return <div className="scores">

    <table className={`score-sheet${status}`}>
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
        {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'total upper'} totals={scores.totalsUpper} /> }
        {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'bonus'} totals={scores.bonusesUpper} /> }
        {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'total lower'} totals={scores.totalsLower} /> }
        {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'TOTAL'} totals={scores.totals} /> }
      </tfoot>

    </table>
  </div>
};

export default connect(
  mapStateToProps,
  {
    onScoreRowClick: addScore
  }
)(ScoreSheet);

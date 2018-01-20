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
    </tr>
};

const ScoreRowTotal = ({name, totals}) => <tr>
    <th className="score-heading-row" scope="row">
      {name}
    </th>
    {totals && totals.map((value, i) =>
      <Score key={i} value={value} />
    )}
  </tr>;

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
        {<ScoreRowTotal name={'total upper'} totals={scores.totalsUpper} /> }
        {<ScoreRowTotal name={'bonus'} totals={scores.bonusesUpper} /> }
        {<ScoreRowTotal name={'total lower'} totals={scores.totalsLower} /> }
        {<ScoreRowTotal name={'TOTAL'} totals={scores.totals} /> }
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

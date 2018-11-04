import React, {Component} from 'react';
import {connect} from 'react-redux';

// import {ScoreRowTotal} from './ScoreSheet';
import ScoreHeaderColumn from './ScoreHeaderColumn';
import ScoreRow from './ScoreRow';
import ScoreRowTotal from './ScoreRowTotal';
import {addScore} from '../../reducers/scores';
import {MAX_ROLLS} from '../../lib/settings';

class ScoreTable extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  render() {
    const {gamePlay, scores, onScoreRowClick} = this.props;
    const canScore = gamePlay.roll === MAX_ROLLS ? 'can-score' : '';

    return <table className={`score-sheet ${canScore}`}>
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
          activePlayer={gamePlay.activePlayer}
          {...item} />
      )}
      </tbody>

      <tfoot>
      {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'total upper'} totals={scores.totalsUpper} /> }
      {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'bonus'} totals={scores.bonusesUpper} /> }
      {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'total lower'} totals={scores.totalsLower} /> }
      {<ScoreRowTotal activePlayer={gamePlay.activePlayer} name={'TOTAL'} totals={scores.totals} /> }
      </tfoot>

    </table>
  }
}

const mapStateToProps = state => (
  {
    gamePlay: state.gamePlay,
    scores: state.scores
  }
);

export default connect(
  mapStateToProps,
  {
    onScoreRowClick: addScore
  }
)(ScoreTable);

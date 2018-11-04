import React from 'react';
import {connect} from 'react-redux';

import {addScore} from '../../reducers/scores';
import ScoreTable from './ScoreTable';

const ScoreSheet = ({gamePlay, scores, onScoreRowClick}) => {
  const isVisible = gamePlay.isScoreSheetVisible ? 'is-visible' : '';

  return <div className={`scores ${isVisible}`}>
    <ScoreTable gamePlay={gamePlay} scores={scores} onScoreRowClick={onScoreRowClick}/>
  </div>
};

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
)(ScoreSheet);

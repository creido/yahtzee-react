import React from 'react';
import {connect} from 'react-redux';

import {toggleScores} from '../reducers/gamePlay';

const mapStateToProps = state => ({isScoreSheetVisible: state.gamePlay.isScoreSheetVisible});

const ToggleScores = ({toggleScores, isScoreSheetVisible}) => {
  const buttonText = isScoreSheetVisible
    ? 'Hide score sheet'
    : 'Show score sheet';

  return <button onClick={toggleScores}>{buttonText}</button>;
}

export default connect(
  mapStateToProps,
  {
    toggleScores,
  }
)(ToggleScores);

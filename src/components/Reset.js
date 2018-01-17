import React from 'react';
import {connect} from 'react-redux';

import {setNextPlayer} from '../reducers/gamePlay';

const mapStateToProps = state => ({
  canRoll: state.gamePlay.canRoll,
  hasScored: state.gamePlay.hasScored
});

const Reset = ({canRoll, hasScored, onResetClick}) => {
  return <button disabled={!hasScored} onClick={() => onResetClick()}>Continue</button>
}

export default connect(
  mapStateToProps,
  {
    onResetClick: setNextPlayer,
  }
)(Reset);

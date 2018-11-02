import React from 'react';
import {connect} from 'react-redux';

import {setNextPlayer} from '../reducers/gamePlay';

const mapStateToProps = state => ({
  hasScored: state.gamePlay.hasScored
});

const Reset = ({hasScored, onResetClick}) => {
  return <button disabled={!hasScored} onClick={onResetClick}>Continue</button>
}

export default connect(
  mapStateToProps,
  {
    onResetClick: setNextPlayer,
  }
)(Reset);

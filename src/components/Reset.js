import React from 'react';
import {connect} from 'react-redux';

import {setNextPlayer} from '../reducers/gamePlay';

const mapStateToProps = state => ({canRoll: state.gamePlay.canRoll});

const Reset = ({canRoll, onResetClick}) => {
  return <button disabled={canRoll} onClick={() => onResetClick()}>Continue</button>
}

export default connect(
  mapStateToProps,
  {
    onResetClick: setNextPlayer,
  }
)(Reset);

import React from 'react';
import {connect} from 'react-redux';

import {setNextPlayer} from '../reducers/gamePlay';

const mapStateToProps = state => ({roll: state.gamePlay.roll});

const Reset = ({roll, onResetClick}) => {
  return <button disabled={roll < 3} onClick={() => onResetClick()}>Continue</button>
}

export default connect(
  mapStateToProps,
  {
    onResetClick: setNextPlayer,
  }
)(Reset);

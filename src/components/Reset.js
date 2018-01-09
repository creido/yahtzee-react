import React from 'react';
import {connect} from 'react-redux';

import {setNextPlayer} from '../reducers/gamePlay';

const mapStateToProps = state => ({players: state.gamePlay.players});

const Reset = ({onResetClick}) => {
  return <button onClick={() => onResetClick()}>Reset</button>
}

export default connect(
  mapStateToProps,
  {
    onResetClick: setNextPlayer,
  }
)(Reset);

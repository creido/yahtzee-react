import React from 'react';
import {connect} from 'react-redux';

import {rollDice} from '../reducers/dice';

const mapStateToProps = state => ({players: state.gamePlay.players});

const Roll = ({onRollClick}) => {
  return <button onClick={() => onRollClick()}>Roll</button>
}

export default connect(
  mapStateToProps,
  {
    onRollClick: rollDice,
  }
)(Roll);

import React from 'react';
import {connect} from 'react-redux';

import {rollDice} from '../reducers/dice';

const mapStateToProps = state => ({roll: state.gamePlay.roll});

const Roll = ({roll, onRollClick}) => {
  return <button disabled={roll >= 3} onClick={() => onRollClick()}>Roll the dice</button>
}

export default connect(
  mapStateToProps,
  {
    onRollClick: rollDice,
  }
)(Roll);

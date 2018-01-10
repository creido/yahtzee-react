import React from 'react';
import {connect} from 'react-redux';

import {rollDice} from '../reducers/dice';

const mapStateToProps = state => ({canRoll: state.gamePlay.canRoll});

const Roll = ({canRoll, onRollClick}) => {
  return <button disabled={!canRoll} onClick={() => onRollClick()}>Roll the dice</button>
}

export default connect(
  mapStateToProps,
  {
    onRollClick: rollDice,
  }
)(Roll);

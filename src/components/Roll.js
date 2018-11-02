import React from 'react';
import {connect} from 'react-redux';

import {rollDice} from '../reducers/dice';

const mapStateToProps = state => ({canRoll: state.gamePlay.canRoll});

const Roll = ({canRoll, rollDice}) => {
  return <button disabled={!canRoll} onClick={rollDice}>Roll the dice</button>
}

export default connect(
  mapStateToProps,
  {
    rollDice,
  }
)(Roll);

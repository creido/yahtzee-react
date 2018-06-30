import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {toggleDie} from '../reducers/dice';

const mapStateToProps = state => ({dice: state.dice});

const Die = ({id, isSelected, value, onDieClick}) => {
  return value !== null && <li
    onClick={() => onDieClick(id)}
    className={`die${isSelected ? ' is-selected' : ' nay'}`} data-value={value}>
      <span className="visually-hidden">{value}</span>
  </li>
};

const Dice = ({dice, onDieClick}) => (
  <ul className='dice'>
    {dice.map(die =>
      <Die
        key={die.id}
        onDieClick={onDieClick}
        {...die} />
    )}
  </ul>
);

// Die.propTypes = {
//   props: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     isSelected: PropTypes.bool.isRequired,
//     value: PropTypes.number.isRequired,
//   }).isRequired).isRequired,
//   onDieClick: PropTypes.func.isRequired,
// };

// export default Dice
export default connect(
  mapStateToProps,
  {
    onDieClick: toggleDie
  }
)(Dice);

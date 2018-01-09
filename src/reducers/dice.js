import {showMessage} from './messages'
import {setRoll} from './gamePlay'

const initialState = [
  {id: 1, isSelected: false, value: null},
  {id: 2, isSelected: false, value: null},
  {id: 3, isSelected: false, value: null},
  {id: 4, isSelected: false, value: null},
  {id: 5, isSelected: false, value: null},
];

const TOGGLE_DIE = 'TOGGLE_DIE';
const ROLL_DICE = 'ROLL_DICE';

/**
 * Get result of a die roll
 *
 * @return {number} Number between 1 and 6
 */
const rollDie = () => Math.ceil(Math.random() * 6);

const actionToggleDie = id => ({type: TOGGLE_DIE, payload: id});

const actionRollDice = () => ({type: ROLL_DICE});

export const rollDice = id => {
  return (dispatch) => {
    dispatch(actionRollDice(id));
    dispatch(setRoll());
  }
};

export const toggleDie = id => {
  return (dispatch) => {
    dispatch(actionToggleDie(id));
    // dispatch(showMessage(`Toggle die ${id}`))
  }
};


export default (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_DIE:

      return state.map(die => {
        if (die.id !== action.payload) {
          return die;
        }

        return {
          ...die,
          isSelected: !die.isSelected
        };
      });

    case ROLL_DICE:
      return state.map(die => {
        if (die.isSelected) {
          return die;
        }

        return {
          ...die,
          value: rollDie()
        };
      });

    default:
      return state;
  }
};

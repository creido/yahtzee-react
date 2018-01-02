// import {showMessage} from './messages'

const initialState = [
  {id: 1, isSelected: false, value: 6},
  {id: 2, isSelected: false, value: 6},
  {id: 3, isSelected: false, value: 6},
  {id: 4, isSelected: false, value: 6},
  {id: 5, isSelected: false, value: 6},
];

const selectedDice = [];

const TOGGLE_DIE = 'TOGGLE_DIE';

/**
 * Get result of a die roll
 *
 * @return {number} Number between 1 and 6
 */
const rollDie = () => {
  return Math.ceil(Math.random() * 6);
}

export const rollDice = () => {
  console.log('roll dice', rollDie());
  return (dispatch) => {
    // dispatch(showMessage('Rolling dice'))
    // destroyTodo(id)
    //   .then(() => dispatch(removeTodo(id)))
  }
}

export const toggleDie = (id) => {
  return {type: TOGGLE_DIE, payload: id}
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

    default:
      return state;
  }
};

const initialState = {
  items: [
    {name: 'ones', description: '', score: [null, null, null, null]},
    {name: 'twos', description: '', score: [null, null, null, null]},
    {name: 'threes', description: '', score: [null, null, null, null]},
    {name: 'fours', description: '', score: [null, null, null, null]},
    {name: 'fives', description: '', score: [null, null, null, null]},
    {name: 'sixes', description: '', score: [null, null, null, null]},
    {name: '3 of a kind', description: '', score: [null, null, null, null]},
    {name: '4 of a kind', description: '', score: [null, null, null, null]},
    {name: 'low straight', description: '', score: [null, null, null, null]},
    {name: 'high straight', description: '', score: [null, null, null, null]},
    {name: 'full house', description: '', score: [null, null, null, null]},
    {name: 'yahtzee', description: '', score: [null, null, null, null]},
    {name: 'chance', description: 'total of all dice', score: [null, null, null, null]},
  ]
};

const ADD_SCORE = 'ADD_SCORE';
const SCORE = 'SCORE';

// const array1 = [1, 2, 3, 4];
const getCombinedScore = (accumulator, currentValue) => accumulator + currentValue;

const getDiceValues = (dice) => {
  return dice.map(die => die.value);
};

const getScore = (arr) => {
  return arr.length && arr.reduce(getCombinedScore);
};

const foo = (diceValues, num) => {
  return diceValues.filter(dieValue => dieValue === num);
};

const checkScore = (dice, scoreName) => {
  const diceValues = getDiceValues(dice);

  switch (scoreName) {
    case 'ones':
      return getScore(foo(diceValues, 1));

    case 'twos':
      return getScore(foo(diceValues, 2));

    case 'threes':
      return getScore(foo(diceValues, 3));

    case 'fours':
      return getScore(foo(diceValues, 4));

    case 'fives':
      return getScore(foo(diceValues, 5));

    case 'sixes':
      return getScore(foo(diceValues, 6));

    default:
      return 0;
  }
};

// action creator using redux thunk async action
export const addScore = (name) => {
  return (dispatch, getState) => {
    // get activePlayer from gamePlay slice of store
    const {activePlayer} = getState().gamePlay;
    const {dice} = getState();

    // dispatch action as normal
    dispatch({
      type: ADD_SCORE,
      activePlayer,
      dice,
      name,
    });
  };
};

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_SCORE:
      // TODO: move logic to external function

      const diceScore = checkScore(action.dice, action.name);

      const selectedItem = state.items.find(item => action.name === item.name);

      if (selectedItem.score[action.activePlayer] !== null) {
        return state;
      }

      const newScore = Object.assign([...selectedItem.score], {[action.activePlayer]: diceScore});
      const updatedItem = {...selectedItem, score: newScore};

      return {
        ...state,
        items: state.items.map(
          item => item.name === action.name
            ? updatedItem
            : item
        )
      }

    case SCORE:
      return state.total;

    default:
      return state;
  }
}

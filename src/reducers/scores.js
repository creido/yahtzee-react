const initialState = {
  items: [
    {name: 'ones', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'twos', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'threes', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'fours', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'fives', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'sixes', description: '', tempScore: null, score: [null, null, null, null]},
    {name: '3 of a kind', description: '', tempScore: null, score: [null, null, null, null]},
    {name: '4 of a kind', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'low straight', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'high straight', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'full house', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'yahtzee', description: '', tempScore: null, score: [null, null, null, null]},
    {name: 'chance', description: 'total of all dice', tempScore: null, score: [null, null, null, null]},
  ]
};

const ADD_SCORE = 'ADD_SCORE';
const LOCK_SCORE = 'LOCK_SCORE';
const SCORE = 'SCORE';

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

    case 'chance':
      return getScore(diceValues);

    default:
      return 0;
  }
};

// action creator using thunk async action
export const addScore = (name) => {
  return (dispatch, getState) => {
    const {activePlayer, roll} = getState().gamePlay;

    if (roll === 0) {
      return;
    }

    const {dice} = getState();
    const diceScore = checkScore(dice, name);

    // dispatch action as normal
    dispatch({
      type: ADD_SCORE,
      activePlayer,
      diceScore,
      name,
    });
  };
};

export const lockScore = () => {
  return (dispatch, getState) => {
    const {activePlayer} = getState().gamePlay;

    dispatch({
      type: LOCK_SCORE,
      activePlayer
    });
  };
};

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_SCORE:

      return {
        ...state,
        items: state.items.map(item => {

          // prevent player replacing a previous score with the new score
          if (item.score[action.activePlayer] !== null) {
            return item;
          }

          const newScore = action.name === item.name
            ? action.diceScore
            : null;

          return {
            ...item,
            tempScore: newScore
          }
        })
      };

    case LOCK_SCORE:

      return {
        ...state,
        items: state.items.map(item => {
          if (item.tempScore === null) {
            return item;
          }

          return {
            ...item,
            score: Object.assign([...item.score], {[action.activePlayer]: item.tempScore}),
            tempScore: null
          }
        })
      };

    case SCORE:
      return state.total;

    default:
      return state;
  }
}

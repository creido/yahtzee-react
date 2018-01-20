import {MAX_ROLLS} from '../lib/settings';
import {setHasScored} from './gamePlay';

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

const getFullHouse = (diceValues) => {
  // return true;
  return diceValues.sort((a, b) => a > b);
};

const getDiceTotal = (diceValues, num) => {
  return diceValues.filter(dieValue => dieValue === num);
};

export const checkScore = (dice, scoreName) => {
  const diceValues = getDiceValues(dice);

  switch (scoreName) {
    case 'ones':
      return getScore(getDiceTotal(diceValues, 1));

    case 'twos':
      return getScore(getDiceTotal(diceValues, 2));

    case 'threes':
      return getScore(getDiceTotal(diceValues, 3));

    case 'fours':
      return getScore(getDiceTotal(diceValues, 4));

    case 'fives':
      return getScore(getDiceTotal(diceValues, 5));

    case 'sixes':
      return getScore(getDiceTotal(diceValues, 6));

    case 'full house':
      return getFullHouse(diceValues);

    case 'chance':
      return getScore(diceValues);

    default:
      return 0;
  }
};

// action creator using thunk async action
export const addScore = name => (dispatch, getState) => {
  const {activePlayer, roll} = getState().gamePlay;

  if (roll < MAX_ROLLS) {
    return;
  }

  const {scores} = getState();
  const selectedItem = scores.items.find(item => item.name === name);

  // prevent player replacing a previous score with the new score
  if (selectedItem.score[activePlayer] === null) {
    const {dice} = getState();
    const diceScore = checkScore(dice, name);

    // dispatch actions as normal
    dispatch({
      type: ADD_SCORE,
      diceScore,
      name
    });

    dispatch(setHasScored());
  }
};

export const lockScore = () => (dispatch, getState) => {
  const {activePlayer} = getState().gamePlay;
  const {dice, scores} = getState();

  const selectedItem = scores.items.find(item => item.tempScore !== null);
  const newScore = Object.assign([...selectedItem.score], {[activePlayer]: selectedItem.tempScore});
  const updatedItem = {...selectedItem, score: newScore, tempScore: null};

  dispatch({
    type: LOCK_SCORE,
    updatedItem,
  });
};

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_SCORE:

      return {
        ...state,
        items: state.items.map(item => {

          const newScore = item.name === action.name
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
        items: state.items.map(
          item => item.name === action.updatedItem.name
            ? action.updatedItem
            : item
        )
      }

    case SCORE:
      return state.total;

    default:
      return state;
  }
}

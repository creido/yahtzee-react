import {
  MAX_ROLLS,
  RANGE_TOTAL_LOWER,
  RANGE_TOTAL_UPPER,
  UPPER_BONUS,
  UPPER_BONUS_THRESHOLD
} from '../lib/settings';

import {sumArrays} from '../helpers';
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
  ],
  totalsUpper: [null, null, null, null],
  bonusesUpper: [null, null, null, null],
  totalsLower: [null, null, null, null],
  totals: [null, null, null, null],
};

const ADD_SCORE = 'ADD_SCORE';
const LOCK_SCORE = 'LOCK_SCORE';
const SCORE = 'SCORE';
const TOTAL_SCORES = 'TOTAL_SCORES';

const getCombinedScore = (accumulator, currentValue) => accumulator + currentValue;

const getDiceValues = dice => {
  return dice.map(die => die.value);
};

const getScore = arr => {
  return arr.length && arr.reduce(getCombinedScore);
};

const getCount = arr =>
  arr.reduce((accumulator, current) =>
    Object.assign(accumulator, {[current]: (accumulator[current] || 0) + 1}), {}
  );

// const getDuplicates = obj => Object.values(obj).filter(a => a > 1).sort((a, b) => a > b);

const getDuplicateTotals = obj => Object.values(obj).sort((a, b) => a > b);

export const isFullHouse = (values) => {
  const count = getCount(values);
  const duplicates = getDuplicateTotals(count);

  return duplicates.length && duplicates.length === 2 && duplicates[0] === 2;
};

export const isXOfAKind = (values, total) => {
  const count = getCount(values);
  const duplicates = getDuplicateTotals(count);

  return Object.values(duplicates).indexOf(total) > -1;
};

const getDifferences = arr =>
  arr.slice().sort((a, b) => a > b).map((n, i, a) => {
    return a[i + 1] - n || 0;
  });

const getSequenceCount = arr => {
  let max = 0;
  let count = 0;

  arr.forEach(n => {
    if (n === 1) {
      count += 1;
      max = count > max && count;
    } else {
      count = 0;
    }
  });

  return max;
};

export const isSequence = (values, sequenceLength = 5) => {
  const valuesNoDuplicates = Array.from(new Set(values))
  const diffs = getDifferences(valuesNoDuplicates);
  const count = getSequenceCount(diffs);

  return count >= sequenceLength - 1;
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
      return isFullHouse(diceValues) ? 25 : 0;

    case '3 of a kind':
      return isXOfAKind(diceValues, 3) ? 30 : 0;

    case '4 of a kind':
      return isXOfAKind(diceValues, 4) ? 40 : 0;

    case 'yahtzee':
      return isXOfAKind(diceValues, 5) ? 50 : 0;

    case 'low straight':
      return isSequence(diceValues, 4) ? 30 : 0;

    case 'high straight':
      return isSequence(diceValues, 5) ? 40 : 0;

    case 'chance':
      return getScore(diceValues);

    default:
      return 0;
  }
};

const getTotals = (scoreItems, range) => {
  return range.map(name => {
    const e = scoreItems.find(item => item.name === name);
    return [].concat(e.score);
  });
};

export const addScore = name => (dispatch, getState) => {
  const {activePlayer, roll} = getState().gamePlay;

  // only allow player to add a score on the final roll
  if (roll < MAX_ROLLS) {
    return;
  }

  const {scores} = getState();
  const selectedItem = scores.items.find(item => item.name === name);

  // prevent player replacing a previous score with the new score
  if (selectedItem.score[activePlayer] === null) {
    const {dice} = getState();
    // TODO: Fix issue with low straight/high straight scoring
    // debugger
    const diceScore = checkScore(dice, name);

    // dispatch actions as normal
    dispatch({
      type: ADD_SCORE,
      diceScore,
      name
    });

    dispatch(
      setHasScored()
    );
  }
};

const setScores = (updatedItem) => {
  return dispatch => {
    dispatch({type: LOCK_SCORE, updatedItem})

    return Promise.resolve('score locked');
  };
};

const setTotals = () => {
  return (dispatch, getState) => {
    // get state scores again once previous score is locked
    const {scores} = getState();

    const totalsUpper = sumArrays(getTotals(scores.items, RANGE_TOTAL_UPPER));
    const bonusesUpper = totalsUpper.map(total => total >= UPPER_BONUS_THRESHOLD
                        ? UPPER_BONUS
                        : 0);
    const totalsLower = sumArrays(getTotals(scores.items, RANGE_TOTAL_LOWER));
    const totals = sumArrays([totalsUpper, bonusesUpper, totalsLower]);

    return dispatch({type: TOTAL_SCORES, totalsUpper, bonusesUpper, totalsLower, totals});
  };
};

export const lockScore = () => (dispatch, getState) => {
  const {activePlayer} = getState().gamePlay;
  const {scores} = getState();

  const selectedItem = scores.items.find(item => item.tempScore !== null);
  const newScore = Object.assign([...selectedItem.score], {[activePlayer]: selectedItem.tempScore});
  const updatedItem = {...selectedItem, score: newScore, tempScore: null};

  return dispatch(
    setScores(updatedItem)
  ).then(() =>
    dispatch(setTotals())
  );
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
      };

    case TOTAL_SCORES:
      return {
        ...state,
        totalsUpper: action.totalsUpper,
        bonusesUpper: action.bonusesUpper,
        totalsLower: action.totalsLower,
        totals: action.totals
      };

    case SCORE:
      return state.total;

    default:
      return state;
  }
}

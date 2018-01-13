import {resetDice} from './dice';
import {showMessage} from './messages';

const initialState = {
  players: [
    {id: 0, name: 'Player 1', isActive: true},
    {id: 1, name: 'Player 2', isActive: false},
    {id: 2, name: 'Player 3', isActive: false},
    {id: 3, name: 'Player 4', isActive: false},
  ],
  activePlayer: 0,
  roll: 0,
  canRoll: true,
};

const MAX_ROLLS = 3;

const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER';
const SET_ROLL = 'SET_ROLL';

const actionSetNextPlayer = id => ({type: SET_NEXT_PLAYER});

export const setRoll = () => ({type: SET_ROLL});
export const setNextPlayer = id => {
  return dispatch => {
    dispatch(actionSetNextPlayer(id));
    dispatch(resetDice());
  }
};

export default (state = initialState, action) => {

  switch (action.type) {

    case SET_NEXT_PLAYER:
      // TODO: move this logic into separate function
      const nextPlayer = state.activePlayer === state.players.length - 1
        ? 0
        : state.activePlayer + 1;

      return {
        ...state,
        activePlayer: nextPlayer,
        roll: 0,
        canRoll: true,
        players: state.players.map(p => {
          return p.id === nextPlayer
            ? {...p, isActive: true}
            : {...p, isActive: false}
          })
      };

    case SET_ROLL:
      // TODO: move this logic into separate function
      const newRoll = state.roll + 1;
      const canRoll = newRoll < MAX_ROLLS ? true : false;

      return {
          ...state,
          canRoll: canRoll,
          roll: newRoll
        };

    default:
      return state;
  }
};

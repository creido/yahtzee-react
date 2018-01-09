import {showMessage} from './messages'

const initialState = {
  players: [
    {id: 1, name: 'Player 1', isActive: true},
    {id: 2, name: 'Player 2', isActive: false},
    {id: 3, name: 'Player 3', isActive: false},
    {id: 4, name: 'Player 4', isActive: false},
  ],
  activePlayer: 1,
  roll: 0,
};

const MAX_ROLLS = 3;

export const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER';
export const SET_ROLL = 'SET_ROLL';

export const setRoll = () => ({type: SET_ROLL});
export const setNextPlayer = (id) => ({type: SET_NEXT_PLAYER});

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_NEXT_PLAYER:
      // TODO: move this logic into separate function
      const nextPlayer = state.activePlayer === state.players.length
        ? 1
        : state.activePlayer + 1;

      return {
          ...state,
          activePlayer: nextPlayer,
          roll: 0,
          players: state.players.map(p => {
            return p.id === nextPlayer
              ? {...p, isActive: true}
              : {...p, isActive: false}
            })
        };

    case SET_ROLL:
      // TODO: move this logic into separate function
      const newRoll = state.roll + 1;

      if (newRoll === MAX_ROLLS) {
        console.log(`end of turn for ${state.activePlayer}`)
        // reset
      }

      return {
          ...state,
          roll: newRoll
        };

    default:
      return state;
  }
};

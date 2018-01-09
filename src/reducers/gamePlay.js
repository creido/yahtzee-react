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

// export const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER';
export const SET_ROLL = 'SET_ROLL';

export const setRoll = () => ({type: SET_ROLL});

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_NEXT_PLAYER:
      console.log('next player');

    case SET_ROLL:
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

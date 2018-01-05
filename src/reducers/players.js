import {showMessage} from './messages'

const initialState = {
  players: [
    {id: 1, name: 'Player 1', isActive: false},
    {id: 2, name: 'Player 2', isActive: false},
    {id: 3, name: 'Player 3', isActive: false},
    {id: 4, name: 'Player 4', isActive: false},
  ],
  activePlayer: 1,
  roll: 1,
};

const MAX_ROLLS = 3;

// export const NEXT_PLAYER = 'NEXT_PLAYER';
export const SET_ROLL = 'SET_ROLL';

export const setRoll = () => ({type: SET_ROLL});

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_ROLL:
      return {
          ...state,
          roll: state.roll + 1
        };

    default:
      return state;
  }
};

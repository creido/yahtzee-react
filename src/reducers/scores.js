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
    {name: 'yahtzee', description: '', score: [null, null, null, null]},
    {name: 'chance', description: 'total of all dice', score: [null, null, null, null]},
  ]
};

const ADD_SCORE = 'ADD_SCORE';
const SCORE = 'SCORE';

// action creator using redux thunk async action
export const addScore = (name) => {
  return (dispatch, getState) => {
    // get activePlayer from gamePlay slice of store
    const activePlayer = getState().gamePlay.activePlayer;

    // dispatch action as normal
    dispatch({
      type: ADD_SCORE,
      name,
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
          if (action.name !== item.name) {
            return item;
          }

          return {
            ...item,
            score: item.score.map((s, index) => {
              if (action.activePlayer !== index || s !== null) {
                return s;
              }

              return 50;
            })
          };
        })
      };

    case SCORE:
      return state.total;

    default:
      return state;
  }
}

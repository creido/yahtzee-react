const initialState = {
  groups: [
    {
      name: 'Upper half',
      items: [
        {name: 'ones', description: '', score: [null, null, null, null]},
        {name: 'twos', description: '', score: [null, null, null, null]},
        {name: 'threes', description: '', score: [null, null, null, null]},
        {name: 'fours', description: '', score: [null, null, null, null]},
        {name: 'fives', description: '', score: [null, null, null, null]},
        {name: 'sixes', description: '', score: [null, null, null, null]},
      ],
      total: [null, null, null, null],
      bonus: [null, null, null, null]
    },
    {
      name: 'Lower half',
      items: [
        {name: '3 of a kind', description: '', score: [null, null, null, null]},
        {name: '4 of a kind', description: '', score: [null, null, null, null]},
        {name: 'yahtzee', description: '', score: [null, null, null, null]},
        {name: 'chance', description: 'total of all dice', score: [null, null, null, null]},
      ],
      total: [null, null, null, null]
    }
  ],
  total: [null, null, null, null]
};

const SCORE = 'SCORE';

export default (state = initialState, action) => {

  switch (action.type) {
    case SCORE:
      return state.total;

    default:
      return state;
  }
}

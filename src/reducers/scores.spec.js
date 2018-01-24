import reducer, {checkScore} from './scores'

describe('Scores reducer', () => {

  test('returns a state object', () => {
    const result = reducer(undefined, {type: 'ANYTHING'})
    expect(result).toBeDefined()
  })

});

describe('Get correct score for a given row in the score sheet', () => {

  test('No ones', () => {
    const dice = [
      {id: 1, isSelected: false, value: 2},
      {id: 2, isSelected: false, value: 3},
      {id: 3, isSelected: false, value: 4},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'ones');
    expect(result).toBe(0);
  });

  test('All ones', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 1},
      {id: 3, isSelected: false, value: 1},
      {id: 4, isSelected: false, value: 1},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, 'ones');
    expect(result).toBe(5);
  });

  test('Mixture of ones and other values', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 1},
      {id: 3, isSelected: false, value: 1},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, 'ones');
    expect(result).toBe(3);
  });

});


describe('Get correct score for a full house', () => {

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 4},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, 'full house');
    expect(result).toBe(0);
  });

  test('correct combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 4},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 4},
    ];

    const result = checkScore(dice, 'full house');
    expect(result).toBe(25);
  });

});


describe('Get correct score for 3 of a kind', () => {

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 4},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, '3 of a kind');
    expect(result).toBe(0);
  });

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 2},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, '3 of a kind');
    expect(result).toBe(0);
  });

  test('correct combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 4},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 4},
    ];

    const result = checkScore(dice, '3 of a kind');
    expect(result).toBe(30);
  });

});


describe('Get correct score for 4 of a kind', () => {

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 4},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, '4 of a kind');
    expect(result).toBe(0);
  });

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 6},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 1},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, '4 of a kind');
    expect(result).toBe(0);
  });

  test('correct combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 4},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 4},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 4},
    ];

    const result = checkScore(dice, '4 of a kind');
    expect(result).toBe(40);
  });

});


describe('Get correct score for yahtzee', () => {

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 4},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, 'yahtzee');
    expect(result).toBe(0);
  });

  test('incorrect combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 6},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'yahtzee');
    expect(result).toBe(0);
  });

  test('correct combination', () => {
    const dice = [
      {id: 1, isSelected: false, value: 3},
      {id: 2, isSelected: false, value: 3},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 3},
      {id: 5, isSelected: false, value: 3},
    ];

    const result = checkScore(dice, 'yahtzee');
    expect(result).toBe(50);
  });

});


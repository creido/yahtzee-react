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


describe('Get correct score for low straight', () => {

  test('1. incorrect combination: 1 2 3 5 6', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(0);
  });

  test('2. incorrect combination: 6 6 3 6 6', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 6},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(0);
  });

  test('3. correct combination: 1 2 3 3 4', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 3},
      {id: 5, isSelected: false, value: 4},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(30);
  });

  test('4. correct combination: 4 2 1 3 1', () => {
    const dice = [
      {id: 1, isSelected: false, value: 4},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 1},
      {id: 4, isSelected: false, value: 3},
      {id: 5, isSelected: false, value: 1},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(30);
  });

  test('5. correct combination: 4 5 3 3 2', () => {
    const dice = [
      {id: 1, isSelected: false, value: 4},
      {id: 2, isSelected: false, value: 5},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 3},
      {id: 5, isSelected: false, value: 2},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(30);
  });

  test('5. correct combination: 6 5 3 4 2', () => {
    const dice = [
      {id: 1, isSelected: false, value: 6},
      {id: 2, isSelected: false, value: 5},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 4},
      {id: 5, isSelected: false, value: 2},
    ];

    const result = checkScore(dice, 'low straight');
    expect(result).toBe(30);
  });

});

describe('Get correct score for high straight', () => {

  test('1. incorrect combination: 1 2 3 5 6', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(0);
  });

  test('2. incorrect combination: 2 4 6 5 6', () => {
    const dice = [
      {id: 1, isSelected: false, value: 2},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 6},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(0);
  });

  test('2b. incorrect combination: 1 4 6 5 6', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 4},
      {id: 3, isSelected: false, value: 6},
      {id: 4, isSelected: false, value: 5},
      {id: 5, isSelected: false, value: 6},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(0);
  });

  test('3. correct combination: 1 2 5 3 4', () => {
    const dice = [
      {id: 1, isSelected: false, value: 1},
      {id: 2, isSelected: false, value: 2},
      {id: 3, isSelected: false, value: 5},
      {id: 4, isSelected: false, value: 3},
      {id: 5, isSelected: false, value: 4},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(40);
  });

  test('4. correct combination: 4 5 3 6 2', () => {
    const dice = [
      {id: 1, isSelected: false, value: 4},
      {id: 2, isSelected: false, value: 5},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 2},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(40);
  });

  test('5. correct combination: 4 5 3 6 7', () => {
    const dice = [
      {id: 1, isSelected: false, value: 4},
      {id: 2, isSelected: false, value: 5},
      {id: 3, isSelected: false, value: 3},
      {id: 4, isSelected: false, value: 6},
      {id: 5, isSelected: false, value: 7},
    ];

    const result = checkScore(dice, 'high straight');
    expect(result).toBe(40);
  });

});

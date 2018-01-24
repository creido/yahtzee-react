import reducer from './dice'

describe('Dice reducer', () => {

	test('returns a state object', () => {
		const result = reducer(undefined, {type: 'ANYTHING'})
		expect(result).toBeDefined()
	})
});

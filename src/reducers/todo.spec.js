import reducer from './todo'

describe('Todo reducer', () => {

	test('returns a state object', () => {
		const result = reducer(undefined, {type: 'ANYTHING'})
		expect(result).toBeDefined()
	})

	test('adds a todo', () => {
		const startState = {
			todos: [
				{id: 1, name:'Item 1', isComplete: true},
				{id: 2, name:'Item 2', isComplete: true},
				{id: 3, name:'Item 3', isComplete: true},
			]
		}

		const expectedState = {
			todos: [
				{id: 1, name:'Item 1', isComplete: true},
				{id: 2, name:'Item 2', isComplete: true},
				{id: 3, name:'Item 3', isComplete: true},
				{id: 4, name:'Item 4', isComplete: false},
			]
		}

		const action = {type: 'TODO_ADD', payload: {id: 4, name:'Item 4', isComplete: false}}
		const result = reducer(startState, action)

		expect(result).toEqual(expectedState)
	})
})
import { SnakeGame } from './SnakeGame'

describe('Snake game', function () {
	test('subscribe and unsubscribe', () => {
		const game = new SnakeGame()
		const callback = () => {}
		const unsubscribe = game.subscribe(callback)
		
		const result = game['subscribers']
		let expected = new Set([callback])
		
		expect(result).toEqual(expected)
		
		unsubscribe()
		expected = new Set()
		
		expect(result).toEqual(expected)
	})
})
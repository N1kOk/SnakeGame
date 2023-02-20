import Board from './Board'
import { useEffect, useState } from 'react'
import { Field, SnakeGame, Status } from '../shared/SnakeGame'

const Game = () => {
	const [field, setField] = useState<Field>([])
	const [status, setStatus] = useState<Status>('play')
	const [score, setScore] = useState<number>(0)
	
	useEffect(() => {
		const game = new SnakeGame()
		
		const unsubscribe = game.subscribe(({status, score, field}) => {
			setField(field)
			setScore(score)
			setStatus(status)
		})
		
		game.start()
		
		return unsubscribe
	}, [])
	
	return (
		<div className="flex justify-center items-center h-screen">
			<Board field={field} status={status} score={score} />
		</div>
	)
}

export default Game
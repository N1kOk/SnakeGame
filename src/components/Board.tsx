import Cell from './Cell'
import { FC } from 'react'
import { Field, Status } from '../shared/SnakeGame'
import { statusMap } from '../shared/constants'

interface BoardProps {
	field: Field
	status: Status
	score: number
}

const Board: FC<BoardProps> = ({ field, status, score }) => {
	const brightness = status === 'lose' ? 0.7 : 1
	
	return (
		<div className="space-y-4">
			<div className="flex justify-between text-2xl font-bold">
				<span>Очки: {score}</span> <span>{statusMap[status]}</span>
			</div>
			<div
				className="grid grid-cols-11 justify-center items-center gap-1 p-2 bg-gray-300 rounded transition-all"
				style={{
					filter: `brightness(${brightness})`
				}}
			>
				{field.map((value, i) =>
					<Cell
						key={i}
						value={value}
					/>)}
			</div>
			<div className="text-center text-3xl">Управление - W, A, S, D</div>
		</div>
	)
}

export default Board
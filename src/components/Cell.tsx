import { FC, memo } from 'react'
import { colorsMap } from '../shared/constants'
import { CellValues } from '../shared/SnakeGame'

interface CellProps {
	value: CellValues
}

const Cell: FC<CellProps> = memo(({ value }) => {
	const background = colorsMap[value]
	
	return (
		<div
			className="w-8 h-8 rounded"
			style={{
				background,
			}}
		/>
	)
})

export default Cell
import { CellValues, Status } from './SnakeGame'

export const colorsMap: Record<Exclude<CellValues, null>, string> = {
	body: '#0a0',
	head: '#0f0',
	meal: '#800',
	empty: '#fff',
}

export const statusMap: Record<Status, string> = {
	'lose': 'Вы проиграли :(',
	'win': 'Вы выиграли!',
	'play': '',
}

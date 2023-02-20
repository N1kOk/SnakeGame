type Callback = (state: State) => any
type Direction = 'left' | 'right' | 'top' | 'bottom'

export type Status = 'play' | 'win' | 'lose'
export type CellValues = 'head' | 'body' | 'meal' | 'empty'
export type Field = CellValues[]

export interface State {
	status: Status
	field: Field
	score: number
}

export class SnakeGame {
	private fieldSize = 11
	private totalCells = this.fieldSize ** 2
	private snakePositions: number[] = [60]
	private currentDirection: Direction = '' as any
	private meals: Set<number> = new Set([16])
	private subscribers: Set<Callback> = new Set()
	private timerId?: NodeJS.Timer
	private score = 0
	
	constructor(private stepTime = 250) {
		this.step = this.step.bind(this)
		this.handleKeydown = this.handleKeydown.bind(this)
		
		window.addEventListener('keydown', this.handleKeydown)
	}
	
	public start() {
		this.timerId = setInterval(this.step, this.stepTime)
	}
	
	private stop() {
		clearInterval(this.timerId)
	}
	
	public subscribe(cb: Callback) {
		this.subscribers.add(cb)
		
		return () => {
			this.subscribers.delete(cb)
		}
	}
	
	private step() {
		const currentPosition = this.snakePositions[0]
		const nextPosition = this.getCellIndex(currentPosition, this.currentDirection)
		
		if (this.snakePositions.length === this.totalCells) {
			this.stop()
			this.broadcastState(this.createState('win'))
			return
		}
		
		if (nextPosition === -1 || this.snakePositions.includes(nextPosition)) {
			if (this.currentDirection) {
				this.stop()
				this.broadcastState(this.createState('lose'))
				return
			}
		}
		
		this.snakePositions.unshift(nextPosition)
		
		if (this.meals.has(nextPosition)) {
			this.score++
			this.meals.delete(nextPosition)
			this.spawnMeal()
		} else {
			this.snakePositions.pop()
		}
		
		this.broadcastState(this.createState('play'))
	}
	
	private spawnMeal() {
		const emptyCells = this.getEmptyCells()
		const cellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
		
		this.meals.add(cellIndex)
	}
	
	private getEmptyCells() {
		const emptyCells = []
		
		for (let i = 0; i < this.totalCells; i++) {
			if (this.snakePositions.includes(i))
				continue
			
			emptyCells.push(i)
		}
		
		return emptyCells
	}
	
	private broadcastState(state: State) {
		this.subscribers.forEach(cb => cb(state))
	}
	
	private createState(status: Status): State {
		return {
			status,
			score: this.score,
			field: this.createField(),
		}
	}
	
	private createField() {
		const state: Field = Array(this.totalCells).fill('empty')
		
		this.snakePositions.forEach(value => state[value] = 'body')
		state[this.snakePositions[0]] = 'head'
		
		this.meals.forEach(value => state[value] = 'meal')
		
		return state
	}
	
	private getCellIndex(cellIndex: number, direction: Direction) {
		let x = cellIndex % this.fieldSize
		let y = Math.floor(cellIndex / this.fieldSize)
		
		switch (direction) {
			case 'left':
				x--
				if (x < 0) return -1
				break
			case 'right':
				x++
				if (x >= this.fieldSize) return -1
				break
			case 'top':
				y--
				if (y < 0) return -1
				break
			case 'bottom':
				y++
				if (y >= this.fieldSize) return -1
				break
		}
		
		return y * this.fieldSize + x
	}
	
	private handleKeydown(e: KeyboardEvent) {
		switch (e.code) {
			case 'KeyW':
				return this.currentDirection = 'top'
			case 'KeyS':
				return this.currentDirection = 'bottom'
			case 'KeyA':
				return this.currentDirection = 'left'
			case 'KeyD':
				return this.currentDirection = 'right'
		}
	}
}

export class Timer {
	#time = $state(0)
	#interval = 0
	#duration

	constructor(duration = 3000) {
		this.#duration = duration
	}

	get time() {
		return this.#time
	}
	set time(value) {
		this.#time = (value / this.#duration) * 100
	}

	stop() {
		this.#time = 0
		clearInterval(this.#interval)
	}

	start() {
		this.#interval = setInterval(() => {
			this.#time += 1
			if (this.#time >= this.#duration) this.stop()
		}, 1000)
	}
}

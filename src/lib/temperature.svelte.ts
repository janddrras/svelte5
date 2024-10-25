export class TempConverter {
	#c = $state(0)
	#f = $state(0)

	get c() {
		return this.#c
	}
	set c(value) {
		this.#c = value
		this.#f = (value * 9) / 5 + 32
	}
	get f() {
		return this.#f
	}
	set f(value) {
		this.#f = value
		this.#c = ((value - 32) * 5) / 9
	}
}

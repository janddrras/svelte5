<script lang="ts">
	let pressed = $state(false)
	let duration = $state(1000)

	function longpress(node: Node, duration: number) {
		let timer: number

		const handleMousedown = () => {
			timer = setTimeout(() => {
				node.dispatchEvent(new CustomEvent('longpress'))
			}, duration)
		}

		const handleMouseup = () => {
			clearTimeout(timer)
		}

		node.addEventListener('mousedown', handleMousedown)
		node.addEventListener('mouseup', handleMouseup)

		return {
			update(newDuration: number) {
				duration = newDuration
			},
			destroy() {
				node.removeEventListener('mousedown', handleMousedown)
				node.removeEventListener('mouseup', handleMouseup)
			}
		}
	}
</script>

<div class="flex justify-center mb-4">
	<input type="range" id="duration" bind:value={duration} max={4000} step={100} class="w-64" />
	<label for="duration" class="ml-2"> {duration} ms</label>
</div>

<button
	class="btn-primary w-1/2 mx-auto hover:bg-blue-700 active:bg-green-700"
	use:longpress={duration}
	onlongpress={() => (pressed = true)}
	onmouseenter={() => (pressed = false)}>press and hold</button
>

{#if pressed}
	<p class="text-orange-400 pt-4">Congratulations, you pressed and held for {duration / 1000} s</p>
{/if}

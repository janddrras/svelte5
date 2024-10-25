<script lang="ts">
	let elapsed = $state(0)
	let duration = $state(1)

	let interval: number

	function start() {
		interval = setInterval(() => {
			elapsed += 0.1
			if (elapsed > duration) clearInterval(interval)
		}, 100)
	}
	function reset() {
		elapsed = 0
		clearInterval(interval)
	}
</script>

<div class="w-full flex items-center justify-center gap-2">
	<h2>Timer</h2>
	<label class="flex flex-col gap-2">
		<span>elapsed time:</span>
		<progress max={duration} value={elapsed}></progress>
	</label>
	<p class="px-4">{elapsed.toFixed(1)} s</p>
	<label class="flex flex-col gap-2">
		<span>duration:</span>
		<input type="range" bind:value={duration} min="1" max="10" />
	</label>
	<p class="px-4">{duration} s</p>
	<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={start}>Start</button>
	<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={reset}>Reset</button>
</div>

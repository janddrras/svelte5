<script lang="ts">
	import { spring } from 'svelte/motion'

	let coords = spring(
		{ x: 100, y: 100 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	)

	let size = spring(10)

	let canv: SVGElement

	function handleMove(e: MouseEvent) {
		const left = canv.getBoundingClientRect().left
		const top = canv.getBoundingClientRect().top
		let newX = e.clientX - left
		let newY = e.clientY - top

		coords.set({ x: newX, y: newY })
	}
</script>

<div class="relative w-full h-[500px]">
	<div class="bg-slate-700 p-4 rounded w-48 mx-auto mb-8">
		<label>
			<h3>stiffness ({coords.stiffness})</h3>
			<input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01" />
		</label>

		<label>
			<h3>damping ({coords.damping})</h3>
			<input bind:value={coords.damping} type="range" min="0" max="1" step="0.01" />
		</label>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svg
		class="w-full h-full -m-2 bg-gray-700 cursor-none"
		onmousemove={(e) => handleMove(e)}
		{...coords}
		{...size}
		onmousedown={() => size.set(30)}
		onmouseup={() => size.set(10)}
		bind:this={canv}
	>
		<circle style="fill: darkgoldenrod;" cx={$coords.x} cy={$coords.y} r={$size} />
	</svg>
</div>

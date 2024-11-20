<script lang="ts">
	import { quintOut, cubicOut } from 'svelte/easing'
	import { fade, draw, fly } from 'svelte/transition'

	const inner = `M45.41,108.86A21.81,21.81,0,0,1,22,100.18,20.2,20.2,0,0,1,18.53,84.9a19,19,0,0,1,.65-2.57l.52-1.58,1.41,1a35.32,35.32,0,0,0,10.75,5.37l1,.31-.1,1a6.2,6.2,0,0,0,1.11,4.08A6.57,6.57,0,0,0,41,95.19a6,6,0,0,0,1.68-.74L70.11,76.94a5.76,5.76,0,0,0,2.59-3.83,6.09,6.09,0,0,0-1-4.6,6.58,6.58,0,0,0-7.06-2.62,6.21,6.21,0,0,0-1.69.74L52.43,73.31a19.88,19.88,0,0,1-5.58,2.45,21.82,21.82,0,0,1-23.43-8.68A20.2,20.2,0,0,1,20,51.8a19,19,0,0,1,8.56-12.7L56,21.59a19.88,19.88,0,0,1,5.58-2.45A21.81,21.81,0,0,1,85,27.82,20.2,20.2,0,0,1,88.47,43.1a19,19,0,0,1-.65,2.57l-.52,1.58-1.41-1a35.32,35.32,0,0,0-10.75-5.37l-1-.31.1-1a6.2,6.2,0,0,0-1.11-4.08,6.57,6.57,0,0,0-7.06-2.62,6,6,0,0,0-1.68.74L36.89,51.06a5.71,5.71,0,0,0-2.58,3.83,6,6,0,0,0,1,4.6,6.58,6.58,0,0,0,7.06,2.62,6.21,6.21,0,0,0,1.69-.74l10.48-6.68a19.88,19.88,0,0,1,5.58-2.45,21.82,21.82,0,0,1,23.43,8.68A20.2,20.2,0,0,1,87,76.2a19,19,0,0,1-8.56,12.7L51,106.41a19.88,19.88,0,0,1-5.58,2.45`
	const outer = `M65,34 L37,52 A1 1 0 0 0 44 60 L70.5,44.5 A1 1 0 0 0 65,34Z M64,67 L36,85 A1 1 0 0 0 42 94 L68,77.5 A1 1 0 0 0 64,67Z`

	function expand(node: SVGPathElement, params: { duration: number; delay: number; easing: (t: number) => number }) {
		const { delay = 0, duration = 400, easing = cubicOut } = params

		const w = parseFloat(getComputedStyle(node).strokeWidth)

		return {
			delay,
			duration,
			easing,
			css: (t: number) => `opacity: ${t}; stroke-width: ${t * w}`
		}
	}
	let visible = $state(true)
</script>

<div>
	{#if visible}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
			<g out:fade={{ duration: 200, delay: 300 }} opacity="0.2">
				<path
					in:expand={{ duration: 400, delay: 1000, easing: quintOut }}
					style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
					d={outer}
				/>
				<path in:draw={{ duration: 1500 }} style="stroke:#ff3e00; stroke-width: 2" d={inner} />
			</g>
		</svg>

		<div class="centered" out:fly={{ y: -20, duration: 800 }}>
			{#each 'SVELTE' as char, i}
				<span in:fade|global={{ delay: 2000 + i * 150, duration: 800 }}>{char}</span>
			{/each}
		</div>
	{/if}

	<label>
		<input type="checkbox" bind:checked={visible} />
		toggle me
	</label>
</div>

<link href="https://fonts.googleapis.com/css?family=Overpass:700" rel="stylesheet" />

<style>
	div {
		position: relative;
		width: 50%;
		margin: 0 auto;
	}
	svg {
		width: 100%;
		height: 100%;
	}

	path {
		fill: white;
		opacity: 1;
	}

	label {
		position: absolute;
		top: 0;
		left: 0;
	}

	.centered {
		font-size: 6rem;
		text-align: center;
		position: absolute;
		left: 8%;
		top: 35%;
		font-family: 'Overpass';
		letter-spacing: 0.12em;
		color: #171796;
		font-weight: 700;
		text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	}

	.centered span {
		will-change: filter;
	}
</style>

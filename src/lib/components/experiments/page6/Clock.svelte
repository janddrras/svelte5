<script>
	import { onMount } from 'svelte'

	let time = $state(new Date())

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	let hours = $derived(time.getHours())
	let minutes = $derived(time.getMinutes())
	let seconds = $derived(time.getSeconds())

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	})
</script>

<svg viewBox="-50 -50 100 100" class="w-1/2 h-1/2 mx-auto">
	<circle style:fill="white" r="48" />

	<!-- markers -->
	{#each { length: 12 } as _, i}
		{@const minute = i * 5}
		<line style:stroke="rgb(0,0,0)" style:stroke-width="0.5" y1="35" y2="45" transform="rotate({30 * minute})" />

		{#each { length: 5 } as _, j}
			{@const offset = j + 1}
			<line style:stroke="#999" style:stroke-width="0.25" y1="42" y2="45" transform="rotate({6 * (minute + offset)})" />
		{/each}
	{/each}

	<!-- hour hand -->
	<line class="hour" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" />

	<!-- minute hand -->
	<line class="minute" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" />

	<!-- second hand -->
	<g transform="rotate({6 * seconds})">
		<line class="second" y1="10" y2="-38" />
		<line class="second-counterweight" y1="10" y2="2" />
	</g>
</svg>

<style>
	line {
		stroke-linecap: round;
	}
	.hour {
		stroke: #333;
		stroke-width: 2;
	}

	.minute {
		stroke: #666;
		stroke-width: 1;
	}

	.second {
		stroke: rgb(187, 23, 23);
		stroke-width: 0.5;
	}

	.second-counterweight {
		stroke: rgb(187, 23, 23);
		stroke-width: 2;
	}
</style>

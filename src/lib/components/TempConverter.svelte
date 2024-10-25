<script lang="ts">
	import { TempConverter } from '$lib/temperature.svelte'

	const temperatures = new TempConverter()
</script>

<div class="w-full flex items-center justify-center">
	<h2>Temperature converter</h2>
	<input type="number" bind:value={temperatures.c} class="px-4 py-2 text-slate-800 rounded mx-2" />
	<p class="mx-2">C <sup>o</sup> =</p>
	<input type="number" bind:value={temperatures.f} class="px-4 py-2 text-slate-800 rounded mx-2" />
	<p class="mx-2">F <sup>o</sup></p>
</div>

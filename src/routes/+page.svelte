<script lang="ts">
	import Counter from '$lib/components/Counter.svelte'
	import FlightBooker from '$lib/components/FlightBooker.svelte'
	import TempConverter from '$lib/components/TempConverter.svelte'
</script>

<h1 class="text-2xl pb-14">Welcome to SvelteKit</h1>
<div class="flex flex-col gap-2">
	<Counter />
	<hr class="m-14 border-t-slate-600" />
	<TempConverter />
	<hr class="m-14 border-t-slate-600" />
	<FlightBooker />
</div>

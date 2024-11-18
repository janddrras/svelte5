<script lang="ts">
	import Counter from '$lib/components/experiments/page1/Counter.svelte'
	import Crud from '$lib/components/experiments/page1/CRUD.svelte'
	import FlightBooker from '$lib/components/experiments/page1/FlightBooker.svelte'
	import TempConverter from '$lib/components/experiments/page1/TempConverter.svelte'
	import Timer from '$lib/components/experiments/page1/Timer.svelte'
	import { page } from '$app/stores'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Counter />
	<hr class="m-14 border-t-slate-600" />
	<TempConverter />
	<hr class="m-14 border-t-slate-600" />
	<FlightBooker />
	<hr class="m-14 border-t-slate-600" />
	<Timer />
	<hr class="m-14 border-t-slate-600" />
	<Crud />
</div>

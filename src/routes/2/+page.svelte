<script lang="ts">
	import Circledrawer from '$lib/components/experiments/page2/Circledrawer.svelte'
	import Excel from '$lib/components/experiments/page2/Excel.svelte'
	import { page } from '$app/stores'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Circledrawer />
	<hr class="m-14 border-t-slate-600" />
	<Excel />
</div>

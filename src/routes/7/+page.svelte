<script lang="ts">
	import { page } from '$app/stores'
	import PanBox from '$lib/components/experiments/page6/page7/PanBox.svelte'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<PanBox />
	<hr class="m-14 border-t-slate-600" />
</div>

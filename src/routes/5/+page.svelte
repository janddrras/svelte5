<script lang="ts">
	import { page } from '$app/stores'
	import Transitions from '$lib/components/experiments/page5/Transitions.svelte'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Transitions />
	<hr class="m-14 border-t-slate-600" />
</div>

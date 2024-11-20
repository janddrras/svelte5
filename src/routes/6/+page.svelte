<script lang="ts">
	import { page } from '$app/stores'
	import Clock from '$lib/components/experiments/page6/Clock.svelte'
	import SvelteLogo from '$lib/components/experiments/page6/SvelteLogo.svelte'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Clock />
	<hr class="m-8 border-t-slate-600" />
	<SvelteLogo />
</div>

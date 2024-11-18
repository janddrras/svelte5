<script>
	import Todos from '$lib/components/experiments/page3/Todos.svelte'
	import VideoPlayer from '$lib/components/experiments/page3/VideoPlayer.svelte'
	import { page } from '$app/stores'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Todos />
	<hr class="m-14 border-t-slate-600" />
	<VideoPlayer />
</div>

<script>
	import Todos from '$lib/components/Todos.svelte'
	import VideoPlayer from '$lib/components/VideoPlayer.svelte'
	import { page } from '$app/stores'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Todos />
	<hr class="m-14 border-t-slate-600" />
	<VideoPlayer />
</div>

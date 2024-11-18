<script lang="ts">
	import { page } from '$app/stores'
	import Cursor from '$lib/components/experiments/page4/Cursor.svelte'
	import TextSelect from '$lib/components/experiments/page4/TextSelect.svelte'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<TextSelect />
	<hr class="m-14 border-t-slate-600" />
	<Cursor />
</div>

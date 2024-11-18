<script lang="ts">
	import { page } from '$app/stores'
	import Modal from '$lib/components/experiments/page5/Modal.svelte'
	import Presser from '$lib/components/experiments/page5/Presser.svelte'
	import Transitions from '$lib/components/experiments/page5/Transitions.svelte'
	import Typewriter from '$lib/components/experiments/page5/Typewriter.svelte'

	const pageName = $page.url.toString().split('/').pop()
</script>

<h1 class="text-2xl pb-14">Page {pageName}</h1>
<div class="flex flex-col gap-2">
	<Transitions />
	<hr class="m-14 border-t-slate-600" />
	<Typewriter />
	<hr class="m-14 border-t-slate-600" />
	<Modal />
	<hr class="m-14 border-t-slate-600" />
	<Presser />
</div>

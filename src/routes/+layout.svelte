<script lang="ts">
	import Nav from '$lib/components/ui/Nav.svelte'
	import '../app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>SvelteKit Playground</title>
	<meta name="description" content="SvelteKit Playground" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main class="bg-gray-800 text-slate-300 w-full h-screen text-center p-10">
	<div class="flex flex-col h-full container lg:px-16">
		<div class="child flex-1">
			{@render children()}
		</div>

		<Nav />
	</div>
</main>

<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="bg-gray-800 text-slate-300 w-full h-screen text-center p-10">
	{@render children()}
</main>

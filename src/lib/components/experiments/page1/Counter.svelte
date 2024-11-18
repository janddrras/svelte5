<script lang="ts">
	let count = $state(0)
</script>

<div class="w-full flex items-center justify-center gap-2">
	<h2>Counter</h2>
	<input type="number" bind:value={count} class="px-4 py-2 text-slate-800 rounded" />
	<button onclick={() => (count += 1)} class="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Increment</button>
	<button onclick={() => (count -= 1)} class="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Decrement</button>
	<button onclick={() => (count = 0)} class="ml-2 bg-red-500 text-white px-4 py-2 rounded">Reset</button>
</div>

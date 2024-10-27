<script lang="ts">
	import { page } from '$app/stores'
	import '../app.css'
	let { children } = $props()
</script>

<main class="bg-gray-800 text-slate-300 w-full h-screen text-center p-10">
	<div class="flex flex-col h-full">
		<div class="child flex-1">
			{@render children()}
		</div>

		<nav class="pt-16 h-2">
			<ul class="flex justify-center gap-4">
				<li>
					<a href="/" class="text-slate-400 hover:text-slate-200">Home</a>
				</li>
				<li>
					<a href="/2" class="text-slate-400 hover:text-slate-200">Page 2</a>
				</li>
			</ul>
		</nav>
	</div>
</main>

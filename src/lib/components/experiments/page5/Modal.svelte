<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let show = $state(false)

	export function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent<HTMLAttributes<HTMLDivElement>>('outclick'))
			}
		}

		document.addEventListener('click', handleClick, true)

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true)
			}
		}
	}
</script>

<div>
	<button onclick={() => (show = true)} class="btn-primary mx-aut">Show modal</button>
	{#if show}
		<div
			use:clickOutside
			onoutclick={() => (show = false)}
			class="absolute top-1/2 left-1/2 w-52 h-52 shadow-xl shadow-slate-900 bg-orange-700 rounded-xl grid -translate-x-1/2 -translate-y-1/2"
		>
			<p class="self-center">click outside</p>
		</div>
	{/if}
</div>

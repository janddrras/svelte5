<script lang="ts">
	import { elasticIn, elasticOut } from 'svelte/easing'

	let visible = $state(true)

	function move(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = elasticIn(t)

				return `
					transform: scale(${Math.min(Math.max(0, eased), 1)});
					opacity: ${Math.min(1, 10 * t)};
					`
			}
		}
	}

	function spin(node: HTMLElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = elasticOut(t)

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		}
	}
</script>

<div class="h-[400px]">
	<button class="btn-primary mx-auto" onclick={() => (visible = !visible)}>Button</button>
	<div class="w-full h-full grid">
		{#if visible}
			<h1 out:spin={{ duration: 4000 }} in:move={{ duration: 2000 }} class="text-6xl tracking-wide self-center">transitions</h1>
		{/if}
	</div>
</div>

<script lang="ts">
	let visible = $state(false)

	function typewriter(node: HTMLParagraphElement, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`)
		}

		const text = node.textContent
		if (!text) return { duration: 0, tick: () => {} }

		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t: number) => {
				const i = ~~(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
</script>

<div class="w">
	<input id="write" type="checkbox" bind:checked={visible} />
	<label class="ml-2" for="write"> {visible ? 'Write' : 'Erase'} </label>
	<div class="h-24">
		{#if visible}
			<p class="pt-8 text-xl" transition:typewriter={{ speed: 1 }}>The quick brown fox jumps over the lazy dog</p>
		{/if}
	</div>
</div>

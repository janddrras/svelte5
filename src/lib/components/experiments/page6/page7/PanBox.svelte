<script lang="ts">
	import { spring } from 'svelte/motion'
	import { pannable } from './panabble'

	const coords = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 })

	function handlePanStart() {
		coords.stiffness = coords.damping = 1
	}

	function handlePanMove(event: CustomEvent) {
		coords.update(($coords) => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy
		}))
	}

	function handlePanEnd(event: CustomEvent) {
		coords.stiffness = 0.2
		coords.damping = 0.4
		coords.set({ x: 0, y: 0 })
	}
</script>

<div class="cont">
	<div
		class="box"
		use:pannable
		onpanstart={handlePanStart}
		onpanmove={handlePanMove}
		onpanend={handlePanEnd}
		style="transform:
	translate({$coords.x}px,{$coords.y}px)
	rotate({$coords.x * 0.2}deg)"
	></div>
</div>

<style>
	.cont {
		margin: 8rem 0;
		position: relative;
		width: 100%;
		height: 100%;
	}
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		cursor: move;
	}
</style>

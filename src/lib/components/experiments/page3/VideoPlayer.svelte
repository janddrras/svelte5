<script lang="ts">
	// These values are bound to properties of the video
	let time = $state(0)
	let duration = $state<number>()
	let paused = $state(true)

	let showControls = $state(true)
	let showControlsTimeout: number

	// Used to track time of last mouse down event
	let lastMouseDown: Date

	function handleMove(e: MouseEvent | TouchEvent) {
		// Make the controls visible, but fade out after
		// 2.5 seconds of inactivity
		e.preventDefault()
		clearTimeout(showControlsTimeout)
		showControlsTimeout = setTimeout(() => (showControls = false), 2500)
		showControls = true

		if (!duration) return // video not loaded yet
		if (e.type !== 'touchmove' && !((e as MouseEvent).buttons & 1)) return // mouse not down

		const clientX = e.type === 'touchmove' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
		const { left, right } = this.getBoundingClientRect()
		time = (duration * (clientX - left)) / (right - left)
	}

	// we can't rely on the built-in click event, because it fires
	// after a drag — we have to listen for clicks ourselves

	function handleMouseup(e: MouseEvent) {
		if (new Date().getTime() - lastMouseDown.getTime() < 300) {
			const target = e.target as HTMLVideoElement | null
			if (target) {
				if (paused) target.play()
				else target.pause()
			}
		}
	}

	function format(seconds: number) {
		if (isNaN(seconds)) return '...'
		const minutes = Math.floor(seconds / 60)
		seconds = Math.floor(seconds % 60)

		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}
</script>

<div class="px-12 text-center w-full">
	<h1>Video</h1>
	<div class="relative h-full w-[800px] mx-auto mt-4">
		<video
			poster="/capture.jpg"
			src="/video.mp4"
			onmousemove={handleMove}
			ontouchmove={handleMove}
			onmousedown={(e) => (lastMouseDown = new Date())}
			onmouseup={handleMouseup}
			bind:currentTime={time}
			bind:duration
			bind:paused
		>
			<track kind="captions" />
		</video>

		<div class="absolute top-0 inset-0 pointer-events-none" style="opacity: {duration && showControls ? 1 : 0}">
			<progress class="w-full opacity-50 -translate-y-1" value={time / duration || 0}></progress>
			<p class="absolute top-1/2 left-1/2 -translate-x-1/2 drop-shadow">click anywhere to {paused ? 'play' : 'pause'} / drag to seek</p>
		</div>
		<div class="absolute bottom-0 w-full flex justify-between p-4" style="opacity: {duration && showControls ? 1 : 0}">
			<p class="text-xl drop-shadow">{format(time)}</p>
			<p class="text-xl drop-shadow">{format(duration)}</p>
		</div>
	</div>
</div>

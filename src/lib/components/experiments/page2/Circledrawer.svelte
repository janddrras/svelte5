<script lang="ts">
	type Circle = {
		id: string
		cx: number
		cy: number
		r: number
	}
	type Status = 'drawing' | 'editing' | 'erasing'

	let circles = $state<Circle[]>([])
	let status = $state<Status>('drawing')
	let selected = $state<Circle | null>(null)

	let snapshots = $state<Circle[][]>([])
	let history = $state(-1)

	function drawCircle(event: MouseEvent) {
		if (status === 'editing') status = 'drawing'
		const container = event.target as SVGElement
		const { left, top } = container.getBoundingClientRect()
		if (status === 'drawing') {
			const circle = {
				id: String(circles.length + 1),
				cx: +(event.clientX - left).toFixed(),
				cy: +(event.clientY - top).toFixed(),
				r: 40
			}
			circles = [...circles, circle]
			selected = circle
			saveSnapshot()
		}
	}
	function selectCircle(e: MouseEvent, circle: Circle) {
		e.stopPropagation()
		if (status === 'erasing') {
			circles = circles.filter((c) => c.id !== circle.id)
			selected = null
			return
		}
		selected = circle
		status = 'editing'
		saveSnapshot()
	}

	function toggleStatus() {
		status = status === 'erasing' ? 'drawing' : 'erasing'
	}

	function undo() {
		circles = snapshots[--history]
	}

	function redo() {
		circles = snapshots[++history]
	}

	function saveSnapshot() {
		history++
		snapshots = [...snapshots, $state.snapshot(circles)]
	}

	$effect(() => {
		if (circles.length === 0) status = 'drawing'
	})
</script>

<div class="flex w-full justify-center relative">
	<div class="flex">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<svg viewBox="0 0 600 400" width="600" height="400" class="border border-slate-200" onclick={drawCircle}>
			{#each circles as circle}
				<circle
					{...circle}
					class="stroke-cyan-100 stroke-1 {circle.id === selected?.id ? 'fill-cyan-900' : 'fill-transparent'}"
					onclick={(e) => selectCircle(e, circle)}
					oncontextmenu={(e) => selectCircle(e, circle)}
				></circle>
			{/each}
		</svg>
		<div class="flex ml-8 items-center gap-2">
			<button onclick={undo} class="bg-blue-500 text-white px-4 py-2 rounded" disabled={history === -1}>Undo</button>
			<button onclick={redo} class="bg-blue-500 text-white px-4 py-2 rounded" disabled={history === snapshots.length - 1}>Redo</button>
			{#if circles.length > 0}
				<button onclick={toggleStatus} class="{status === 'erasing' ? 'bg-red-500' : 'bg-blue-500'} text-white px-4 py-2 rounded"
					>Erase</button
				>
				<button onclick={() => (circles = [])} class="bg-blue-500 text-white px-4 py-2 rounded">Clear</button>
			{/if}
		</div>
	</div>
	{#if status === 'editing' && selected}
		<div class="absolute top-0 right-16 p-4 bg-slate-600 text-slate-200 shadow-lg rounded">
			<div class="flex items-start flex-col gap-4">
				<label for="cx" class="mr-2">Adjust Radius:</label>
				<input
					type="range"
					min="10"
					max="100"
					id="r"
					bind:value={selected.r}
					class="border border-slate-200 bg-transparent text-slate-200 rounded px-2 py-1"
				/>
				<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={toggleStatus}>Save</button>
			</div>
		</div>
	{/if}
</div>

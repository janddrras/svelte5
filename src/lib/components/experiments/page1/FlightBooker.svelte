<script lang="ts">
	type Options = 'one-way' | 'return'
	let selected = $state<Options>('one-way')
	let departure = $state(getDate())
	let returnDate = $state(getDate())

	function getDate() {
		const [month, day, year] = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/')
		return `${year}-${month}-${day}`
	}

	function handleSubmit(event: Event) {
		event.preventDefault()
		console.log({ selected, departure, returnDate })
	}
</script>

<div class="w-full flex items-center justify-center gap-2">
	<h2>Flight Booker</h2>
	<form onsubmit={handleSubmit}>
		<select class="px-4 py-2 text-slate-800 rounded" bind:value={selected}>
			<option value="one-way">One way</option>
			<option value="return">Return</option>
		</select>
		<input type="date" class="px-4 py-2 text-slate-800 rounded" bind:value={departure} min={getDate()} />
		<input type="date" class="px-4 py-2 text-slate-800 rounded" bind:value={returnDate} min={departure} disabled={selected !== 'return'} />
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-200 disabled:cursor-not-allowed"
			type="submit"
			disabled={!departure || (selected === 'return' && returnDate < departure)}>Submit</button
		>
	</form>
</div>

<script lang="ts">
	const cols = 10
	const rows = 10
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const data = $state([
		[{ value: 'Item' }, { value: 'Price' }, { value: 'Quantity' }, { value: 'Total' }],
		[{ value: '🍔🍔' }, { value: '15' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
		[{ value: '🍖🍖' }, { value: '4' }, { value: '12' }, { value: '=MULTIPLY(B3,C3)' }],
		[{ value: '🍌🍌' }, { value: '21' }, { value: '50' }, { value: '=MULTIPLY(B4,C4)' }],
		[{ value: '' }, { value: '' }, { value: 'Total' }, { value: '=SUM(D2,D4)' }]
	])

	let selectedCell = $state()
	let editedCell = $state()

	function parseValue(value: string): string | number {
		if (value.startsWith('=')) {
			const { operation, cells } = parseFormula(value)

			const values = cells.map(({ row, col }) => {
				const value = data[row][col].value
				if (value.startsWith('=')) {
					return +parseValue(value)
				}
				return +value
			})

			return values.reduce(
				(total, value) => {
					if (operation === 'SUM') return total + value
					if (operation === 'MULTIPLY') return total * value
					return total
				},
				operation === 'MULTIPLY' ? 1 : 0
			)
		}

		return value
	}

	function parseFormula(value: string) {
		// =MULTIPLY(B2,C2)
		const [a, b] = value.split('(')
		const operation = a.split('=')[1]
		const cells = b.replace(')', '').split(',')
		return { operation, cells: cells.map(cellNameToIndex) }
	}

	function cellNameToIndex(value: string) {
		// A1 -> 00 -> data[0][0]
		const [col, ...row] = value.split('')
		return { row: +row.join('') - 1, col: alphabet.indexOf(col) }
	}
</script>

<h2 class="mb-8">EXCEL table</h2>
<div class="relative mx-auto">
	<table class="bg-slate-700 rounded-lg table-auto">
		<thead>
			<tr>
				<th class="px-4 py-2"></th>
				{#each Array(rows) as _, i}
					<th class="px-4 py-2 hover:bg-slate-600">{alphabet[i]}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Array(rows) as _, i}
				<tr>
					<th class="px-4 py-2 hover:bg-slate-600">{i + 1}</th>
					{#each Array(cols) as _, j}
						{@const cell = `${alphabet[j]}${i + 1}`}
						{@const value = data[i]?.[j]?.value}
						{@const selected = selectedCell === cell}
						{@const edited = editedCell === cell}
						{@const parsedValue = value ? parseValue(value) : ''}
						<td
							data-cell={cell}
							onclick={() => {
								if (selected) return
								selectedCell = cell
								editedCell = null
							}}
							class="{selected
								? 'bg-slate-600 border-orange-600'
								: 'bg-slate-900'} cursor-pointer px-4 py-2 hover:bg-slate-600 border border-slate-400/15">{parsedValue}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

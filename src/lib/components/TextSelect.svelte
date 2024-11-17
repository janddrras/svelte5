<script lang="ts">
	import { tick } from 'svelte'

	let text = $state(
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum totam aspernatur, numquam, iusto provident ducimus consectetur aut natus laboriosam saepe odio impedit tempora repellat autem dolor placeat fuga veniam! Aperiam eos in, itaque error quibusdam quidem blanditiis aliquam cumque eligendi sapiente aspernatur, ducimus unde molestiae minus nostrum quasi dignissimos vero?'
	)

	async function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return

		event.preventDefault()

		const { selectionStart, selectionEnd, value } = this
		const selection = value.slice(selectionStart, selectionEnd)

		const replacement = /[a-z]/.test(selection) ? selection.toUpperCase() : selection.toLowerCase()

		text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd)

		await tick()
		this.selectionStart = selectionStart
		this.selectionEnd = selectionEnd
	}
</script>

<p>Select some text and hit the tab key to toggle uppercase</p>
<textarea class="w-[800px] h-[200px] bg-slate-900 text-slate-100 p-2 mx-auto leading-6 tracking-wide" value={text} onkeydown={handleKeydown}
></textarea>

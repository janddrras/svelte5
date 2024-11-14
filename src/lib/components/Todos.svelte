<script lang="ts">
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			}
		}
	})

	type Todo = {
		id: string
		done: boolean
		description: string
	}
	let todos = $state<Todo[]>([])

	$effect(() => {
		const stored = localStorage.getItem('todos')
		if (stored) todos = JSON.parse(stored)
	})

	$effect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	})

	function add(input: HTMLInputElement) {
		const todo = {
			id: window.crypto.randomUUID(),
			done: false,
			description: input.value
		}

		todos = [todo, ...todos]
		input.value = ''
	}

	function remove(todo: Todo) {
		todos = todos.filter((t) => t !== todo)
	}
</script>

<div class="w-[800px] mx-auto p-16">
	<input
		class="p-2 text-slate-800 bg-slate-200 rounded w-full"
		placeholder="what needs to be done?"
		onkeydown={(event) => event.key === 'Enter' && add(event.target as HTMLInputElement)}
	/>

	<div class="flex gap-8 w-full mt-8">
		{#snippet todoList(todos: Todo[], title: string)}
			<div class="text-left w-full">
				<h2 class="text-2xl text-blue-300 mb-4">{title}</h2>
				<div class="flex flex-col gap-2">
					{#each todos as todo (todo.id)}
						<div
							class="relative w-full {todo.done ? 'bg-slate-500' : 'bg-green-800'} py-2 px-4 rounded"
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<input class="w-4 h-4 mr-2" type="checkbox" bind:checked={todo.done} />
							{todo.description}
							<button class="absolute right-4 text-red-500 cursor-pointer hover:text-red-800 transition-colors" onclick={() => remove(todo)}
								>x</button
							>
						</div>
					{/each}
				</div>
			</div>
		{/snippet}

		{@render todoList(
			todos.filter((t) => !t.done),
			'To do'
		)}

		{@render todoList(
			todos.filter((t) => t.done),
			'Done'
		)}
	</div>
</div>

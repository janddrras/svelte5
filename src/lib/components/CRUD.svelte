<script lang="ts">
	type User = {
		name: string
		email: string
	}

	let usersDb = $state<User[]>([
		{ name: 'John Doe', email: 'test@test.com' },
		{ name: 'Jane Doe', email: 'bg@cedet.com' },
		{ name: 'MKO', email: 'google@yahoo.com' }
	])
	let selectedUser = $state<User | null>(null)
	let user = $state<User>({ name: '', email: '' })

	let prefix = $state('')
	const filteredUsers = $derived(prefix ? usersDb.filter((u) => u.name.toLowerCase().startsWith(prefix)) : usersDb)

	const addUser = () => {
		usersDb = [...usersDb, user]
		user = { name: '', email: '' }
	}
	const updateUser = () => {
		const index = usersDb.indexOf(selectedUser!)
		usersDb[index] = user
		user = { name: '', email: '' }
	}
	const deleteUser = () => {
		usersDb = usersDb.filter((u) => u !== selectedUser)
		user = { name: '', email: '' }
	}

	$effect(() => {
		user = { name: selectedUser?.name ?? '', email: selectedUser?.email ?? '' }
	})
</script>

<h2>CRUD</h2>
<div class="w-full flex items-top justify-center gap-4">
	<div class="flex flex-col gap-2">
		<label class="flex flex-col gap-2">
			<span>search:</span>
			<input class="text-slate-800 px-2 py-4 rounded" type="text" bind:value={prefix} />
		</label>
		<label class="flex flex-col gap-2">
			<span>Users:</span>
			<select class="p-2 rounded" bind:value={selectedUser} size="5">
				{#each filteredUsers as user}
					<option class="py-2 text-slate-800" value={user}>{user.name} | {user.email}</option>
				{/each}
			</select>
		</label>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex gap-2">
			<label class="flex flex-col gap-2">
				<span>name:</span>
				<input class="text-slate-800 px-2 py-4 rounded" type="text" bind:value={user.name} />
			</label>
			<label class="flex flex-col gap-2">
				<span>email:</span>
				<input class="text-slate-800 px-2 py-4 rounded" type="email" bind:value={user.email} />
			</label>
		</div>
		<div class="flex gap-2 pt-8">
			<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={addUser}> Add </button>
			<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={updateUser}> Update </button>
			<button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={deleteUser}> Delete </button>
		</div>
	</div>
</div>

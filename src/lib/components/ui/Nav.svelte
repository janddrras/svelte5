<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'

	let slug: string | undefined
	let currentPage: number

	afterNavigate(() => {
		slug = $page.url.toString().split('/').pop()
		currentPage = slug === '' ? 0 : parseInt(slug!)
		console.log('currentPage', currentPage)
	})
</script>

<nav class="pt-16 h-2">
	<ul class="flex justify-center gap-4">
		{#each { length: 5 } as _, i}
			{@const pageName = i === 0 ? 'Home' : `Page ${i}`}
			{#if i === currentPage}
				<li>
					<p class="text-slate-600 font-bold">{pageName}</p>
				</li>
			{:else}
				<li>
					<a href="/{i === 0 ? '' : i}" class="text-slate-400 hover:text-slate-200">{pageName}</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

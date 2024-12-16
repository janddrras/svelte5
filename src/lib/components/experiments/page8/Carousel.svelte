<script lang="ts">
	import 'iconify-icon'
	import { carouselList } from './CarouselList'
	import type { CarouselItem } from './CarouselList'
	import { fade, fly, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { Timer } from '../../../timer.svelte'

	let visible = $state(0)
	let play = $state(false)

	let timer = new Timer(3000)

	const sortThumbs = (arr: CarouselItem[], idx: number): CarouselItem[] => [...arr.slice(idx), ...arr.slice(0, idx)]

	let thumbList: CarouselItem[] = $derived(sortThumbs(carouselList, visible).filter((i) => i.id !== visible + 1))

	const changePic = (mode: 'next' | 'prev' | 'thumb', id?: number) => {
		if (mode === 'next') {
			visible = visible === carouselList.length - 1 ? 0 : visible + 1
			thumbList
		} else if (mode === 'prev') {
			visible = visible === 0 ? carouselList.length - 1 : visible - 1
		} else {
			visible = id! - 1
		}
	}

	$effect(() => {
		if (!play) return
		let interval = setInterval(() => {
			changePic('next')
			timer.start()
		}, 3000)
		timer.stop()
		return () => clearInterval(interval)
	})
</script>

<section id="carousel">
	{#if play}
		<div class="duration" style:width={`${100 - timer.time}%`}></div>
	{/if}
	<div class="list">
		{#key carouselList[visible].id}
			<article class="frame">
				<img
					src={carouselList[visible].image}
					alt={carouselList[visible].title}
					out:fade={{ duration: 2000 }}
					style:transformOrigin={`640px ${visible}px`}
				/>
				<div class="content" out:fly={{ y: -100, duration: 1000 }}>
					<h1>{carouselList[visible].author}</h1>
					<h2>{carouselList[visible].title}</h2>
					<h3>{carouselList[visible].topic}</h3>
					<p>{carouselList[visible].content}</p>
				</div>
			</article>
		{/key}
	</div>

	<div class="thumbs">
		{#each thumbList as thumb (thumb.id)}
			{@const { title, content, image } = thumb}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="thumbnail"
				onclick={() => changePic('thumb', thumb.id)}
				in:fade={{ duration: 500, delay: 100 }}
				out:scale={{ duration: 600, opacity: 0, start: 3, delay: 300 }}
				animate:flip={{ duration: 1500, delay: 300 }}
			>
				<img src={image} alt={title} />
				<div class="text">
					<h2>{title}</h2>
					<p>{content.substring(0, 15)} ...</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="arrows">
		<button onclick={() => changePic('prev')} aria-label="Previous slide">
			<iconify-icon icon="material-symbols:skip-previous-outline-rounded" width="24" height="24"></iconify-icon>
		</button>
		<button onclick={() => (play = !play)} aria-label="Play slideshow">
			{#if !play}
				<iconify-icon icon="material-symbols:play-arrow-rounded" width="24" height="24"></iconify-icon>
			{:else}
				<iconify-icon icon="material-symbols:pause-rounded" width="24" height="24"></iconify-icon>
			{/if}
		</button>
		<button onclick={() => changePic('next')} aria-label="Next slide">
			<iconify-icon icon="material-symbols:skip-next-outline-rounded" width="24" height="24"></iconify-icon>
		</button>
	</div>
</section>

<style>
	#carousel {
		font-family: 'Poppins', sans-serif;
		font-size: 12px;
		text-align: left;
		width: 100%;
		height: 800px;
		overflow: hidden;
		position: relative;
	}

	.frame {
		position: absolute;
		inset: 0;
		z-index: 1;
		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transform-origin: 640px 640px;
			animation: showImage 1s forwards;
		}
		& .content {
			position: absolute;
			max-width: 80%;
			top: 13%;
			left: 10%;
			padding-right: 40%;
			text-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
			& h1 {
				font-weight: bold;
				letter-spacing: 10px;
				padding-bottom: 1rem;
				animation-delay: 1.2s !important;
			}
			& h2 {
				font-size: 3rem;
				font-weight: bold;
				line-height: 2rem;
				animation-delay: 1.4s !important;
			}
			& h3 {
				font-size: 3rem;
				font-weight: bold;
				color: #f1683a;
				animation-delay: 1.6s !important;
			}
			& p {
				line-height: 1.2rem;
				animation-delay: 1.8s !important;
			}
			& p,
			h1,
			h2,
			h3 {
				opacity: 0;
				filter: blur(20px);
				transform: translateY(-50px);
				animation: fadeIn 1s forwards;
			}
		}
	}

	.duration {
		position: absolute;
		top: 0;
		left: 0;
		height: 10px;
		background-color: #f1683a;
		z-index: 100;
	}

	@keyframes showImage {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0);
		}
	}

	.thumbs {
		position: absolute;
		bottom: 50px;
		right: 50px;
		z-index: 100;
		width: max-content;
		display: flex;
		gap: 20px;
		& .thumbnail {
			width: 150px;
			height: 220px;
			flex-shrink: 0;
			position: relative;
			cursor: pointer;
			& img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 20px;
			}
			& .text {
				position: absolute;
				bottom: 10px;
				left: 10px;
				width: 100%;
				opacity: 0.8;
				& h2 {
					font-weight: bold;
				}
			}
		}
	}

	.arrows {
		position: absolute;
		bottom: 50px;
		left: 10%;
		width: 300px;
		display: flex;
		gap: 20px;
		z-index: 20;
		& button {
			background-color: rgba(255, 255, 255, 0.1);
			color: white;
			border: none;
			width: 64px;
			height: 64px;
			border-radius: 50%;
			padding: 10px 20px;
			cursor: pointer;
			transition: 0.5s;
			&:hover {
				background-color: rgba(255, 255, 255, 0.3);
			}
		}
	}
</style>

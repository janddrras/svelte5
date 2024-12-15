export interface CarouselItem {
	id: number
	title: string
	author: string
	topic: string
	content: string
	image: string
}

export const carouselList: CarouselItem[] = [
	{
		id: 1,
		title: 'First Slide',
		author: 'John Doe',
		topic: 'Animal',
		content:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
		image: 'image/img1.jpg'
	},
	{
		id: 2,
		title: 'Second Slide',
		author: 'John Doe',
		topic: 'Animal',
		content:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
		image: 'image/img5.jpg'
	},
	{
		id: 3,
		title: 'Third Slide',
		author: 'John Doe',
		topic: 'Animal',
		content:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
		image: 'image/img3.jpg'
	},
	{
		id: 4,
		title: 'Fourth Slide',
		author: 'John Doe',
		topic: 'Animal',
		content:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
		image: 'image/img4.jpg'
	}
]

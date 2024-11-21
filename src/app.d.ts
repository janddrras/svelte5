// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'svelte/elements' {
	export interface HTMLAttributes {
		onoutclick?: (event: CustomEvent) => void
		onlongpress?: (event: CustomEvent) => void
		onpanstart?: (event: CustomEvent) => void
		onpanmove?: (event: CustomEvent) => void
		onpanend?: (event: CustomEvent) => void
	}
}

export {}

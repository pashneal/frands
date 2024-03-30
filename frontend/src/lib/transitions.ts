import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
import { writable } from 'svelte/store';

/// Allows blobs to be manipulated across components
let blobs : Array<number> = [];
export const moved_blob_ids = writable(blobs);

export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 200),

	fallback(node, _params) {
		const style = getComputedStyle(node); 
		const transform = style.transform === 'none' ? '' : style.transform;
    console.log("fallbacking");

		return {
			duration: 600,
			easing: quintOut,
			css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
		};
	}
});




import { writable } from 'svelte/store';

const initial = localStorage.getItem('gurecipes-capikey');

export const capikey = writable(initial);

capikey.subscribe((value) => {
	if (value) {
		localStorage.setItem('gurecipes-capikey', value);
	} else {
		localStorage.removeItem('gurecipes-capikey');
	}
});

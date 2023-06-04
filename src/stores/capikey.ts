import { writable } from 'svelte/store';

const STORAGE_KEY = 'gurecipes-capikey';
const initial = localStorage.getItem(STORAGE_KEY);

export const capikey = writable(initial);

capikey.subscribe((value) => {
	if (value) {
		localStorage.setItem(STORAGE_KEY, value);
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
});

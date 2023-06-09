import { writable } from 'svelte/store';
import type { SlimRecipe } from '../../types';

import recipedump from '../recdump.json?raw';

const recipes = JSON.parse(recipedump) as SlimRecipe[];
const STORAGE_KEY = 'guri-favs';
const initial = localStorage.getItem(STORAGE_KEY);

const serialise = (recipes: SlimRecipe[]) => recipes.map((rec) => rec.id).join(',');
const deserialise = (ids: string): SlimRecipe[] => {
	const recipeIds = ids.split(',');
	return recipes.filter((recipe) => recipeIds.includes(recipe.id));
};

export const favs = (function createFavs() {
	const { subscribe, update } = writable(initial ? deserialise(initial) : []);

	return {
		subscribe,
		toggle: (rec: SlimRecipe) =>
			update((favs) => {
				const without = favs.filter((fav) => fav.id !== rec.id);

				if (without.length === favs.length) {
					without.push(rec);
				}
				return without;
			})
	};
})();

favs.subscribe((value) => {
	localStorage.setItem(STORAGE_KEY, serialise(value));
});

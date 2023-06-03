import type { PageLoad } from './$types';
import recipedump from '../recdump.json?raw';

import type { SlimRecipe } from '../../types';

const recipes = JSON.parse(recipedump) as SlimRecipe[];

export const load: PageLoad = async function load() {
	return {
		recipes
	};
};

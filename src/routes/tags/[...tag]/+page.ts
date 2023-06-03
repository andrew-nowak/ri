import type { PageLoad } from './$types';
import recipedump from '../../../recdump.json?raw';
import tagdump from '../../../tagdump.json?raw';

import type { Tag, SlimRecipe } from '../../../../types';

const recipes = JSON.parse(recipedump) as SlimRecipe[];
const tags = JSON.parse(tagdump) as Tag[];

export const load: PageLoad = async function load({ params }) {
	const pagetagno = tags.findIndex(({ id }) => id === params.tag);
	const taggedrecipes = recipes.filter(({ tags }) => tags.some((tagno) => pagetagno === tagno));
	return {
		tag: params.tag,
		recipes: taggedrecipes
	};
};

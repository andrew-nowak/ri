import type { PageLoad } from './$types';
import tagdump from '../../tagdump.json?raw';
const ignoretags = [
	'tone',
	'food/food',
	'type',
	'publication',
	'lifeandstyle',
	'tracking',
	'theguardian',
	'theobserver',
	'world',
	'environment'
];

import type { Tag } from '../../../types';

const tags: Tag[] = (JSON.parse(tagdump) as Tag[]).filter(
	({ id }) => !ignoretags.some((ignoretag) => id.startsWith(ignoretag))
);

export const load: PageLoad = async function load() {
	return { data: tags.sort((a, b) => b.count - a.count) };
};

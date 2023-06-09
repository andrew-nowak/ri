import process from 'node:process';
import { writeFileSync } from 'node:fs';

import type { Tag, Recipe, SlimRecipe } from '../types';

const apikey = process.env.CAPI_KEY;

let failing = false;

const sleep = async () => new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

const main = async () => {
	if ((apikey?.length ?? 0) === 0) {
		console.log('make sure to set CAPI_KEY first!!!!');
		process.exit(1);
	}
	let pageno = 1;
	const tagstore: Tag[] = [];
	const taglookup: Record<string, number> = {};
	const recipes: Recipe[] = [];
	while (pageno >= 1) {
		await sleep();
		const url = `https://content.guardianapis.com/search?tag=tone%2Frecipes&api-key=${apikey}&page-size=50&page=${pageno}&show-tags=all&show-fields=headline`;
		const resp = await fetch(url);
		const respj = await resp.json();
		if (respj.response.status !== 'ok') {
			console.log(`capi query ${url} failed saying status ${respj.response.status}`);
			console.log(JSON.stringify(respj));
			failing = true;
			break;
		}
		for (const rec of respj.response.results) {
			recipes.push(rec);

			const tags: Tag[] = rec.tags ?? [];

			for (const tag of tags) {
				if (taglookup[tag.id] === undefined) {
					tagstore.push({ id: tag.id, webTitle: tag.webTitle, webUrl: tag.webUrl, count: 1 });
					taglookup[tag.id] = tagstore.length - 1;
				} else {
					tagstore[taglookup[tag.id]].count++;
				}
			}
		}
		console.log(`wrote page ${pageno} of ${respj.response.pages}`);

		if (respj.response.currentPage < respj.response.pages) {
			console.log(`next: ${pageno + 1}`);
			pageno++;
		} else {
			break;
		}
	}

	const recipedump: SlimRecipe[] = recipes.map((rawRecipe) => ({
		id: rawRecipe.id,
		headline: rawRecipe.fields?.headline,
		tags: rawRecipe.tags.map((t) => taglookup[t.id])
	}));

	writeFileSync('../src/tagdump.json', JSON.stringify(tagstore), { flag: 'w' });
	writeFileSync('../src/recdump.json', JSON.stringify(recipedump), { flag: 'w' });
	if (!failing) {
		console.log('done; exiting byee!');
	} else {
		console.log('completed with errors! try again later');
		process.exit(1);
	}
};

main();

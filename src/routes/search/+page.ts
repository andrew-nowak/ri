import type { PageLoad } from './$types';

export const load: PageLoad = async function load({ url }) {
	const q = url.searchParams.get('q');
	return {
		q
	};
};

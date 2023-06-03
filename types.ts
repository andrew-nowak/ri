export type Tag = {
	id: string;
	webTitle: string;
	webUrl: string;
	count: number;
};

export type Recipe = {
	id: string;
	fields: { headline: string };
	tags: Tag[];
};

export type SlimRecipe = {
	id: string;
	headline: string;
	tags: number[];
};

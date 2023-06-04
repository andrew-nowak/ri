<script lang="ts">
	import type { Recipe } from '../../../types';
	import RecipeList from '../../components/RecipeList.svelte';
	import { capikey } from '../../stores/capikey';

	export let data: import('./$types').PageData;
	$: q = data.q;

	$: query = !$capikey
		? Promise.resolve()
		: fetch(
				`https://content.guardianapis.com/search?tag=tone%2Frecipes&q=${q}&api-key=${$capikey}&page-size=50&show-fields=headline`
		  )
				.then((resp) => resp.json())
				.then((blob) => blob.response.results as Recipe[])
				.then((fullRecipes) =>
					fullRecipes.map((full) => ({ id: full.id, headline: full.fields.headline, tags: [] }))
				);

	function setcapikey() {
		const newValue = (document.getElementById('capikey') as HTMLInputElement).value;
		capikey.set(newValue);
	}
</script>

<p>{q}</p>

{#if $capikey === null}
	<p>set a CAPI key!</p>
	<input type="text" autocomplete="off" name="capikey" id="capikey" />
	<button on:click={setcapikey}>set</button>
{:else}
	{#await query}
		<p>loading</p>
	{:then results}
		{#if results && results.length}
			<RecipeList recipes={results} />
		{:else}
			<p>oops!</p>
			<p>no results; sorry! try a different search</p>
		{/if}
	{:catch error}
		<p>argh {error.message}</p>
	{/await}
{/if}

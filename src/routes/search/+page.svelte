<script lang="ts">
	export let data: import('./$types').PageData;
	$: q = data.q;
	let capikey = window.localStorage.getItem('gurecipes-capikey');

	$: query =
		capikey === undefined
			? undefined
			: fetch(
					`https://content.guardianapis.com/search?tag=tone%2Frecipes&q=${q}&api-key=${capikey}&page-size=50`
			  )
					.then((resp) => resp.json())
					.then((blob) => blob.response.results);

	function setcapikey() {
		capikey = (document.getElementById('capikey') as HTMLInputElement).value;
		window.localStorage.setItem('gurecipes-capikey', capikey);
	}
</script>

<p>{q}</p>

{#if capikey === null}
	<p>set a CAPI key!</p>
	<input type="text" autocomplete="off" name="capikey" id="capikey" />
	<button on:click={setcapikey}>set</button>
{:else}
	{#await query}
		<p>loading</p>
	{:then results}
		<ol>
			{#each results as { webUrl, webTitle }}
				<li><a target="_blank" href={webUrl}>{webTitle}</a></li>
			{/each}
		</ol>
	{:catch error}
		<p>argh {error.message}</p>
	{/await}
{/if}

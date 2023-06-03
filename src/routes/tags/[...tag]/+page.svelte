<script lang="ts">
	export let data: import('./$types').PageData;
</script>

<p>{data.tag}</p>
<p>{data.recipes.length}</p>
<ol>
	{#each data.recipes as { id, headline }}
		<li>
			<a target="_blank" rel="noreferrer" href="https://www.theguardian.com/{id}">{headline}</a>
		</li>
	{/each}
</ol>

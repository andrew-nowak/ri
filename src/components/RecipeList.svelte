<script lang="ts">
	import type { SlimRecipe } from '../../types';

	export let recipes: SlimRecipe[];
</script>

<ol>
	{#each recipes as { id, headline }}
		<li>
			<a target="_blank" rel="noreferrer" href="https://www.theguardian.com/{id}">{headline}</a>
		</li>
	{/each}
</ol>

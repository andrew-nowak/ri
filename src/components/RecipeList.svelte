<script lang="ts">
	import { favs } from '../stores/favs';

	import type { SlimRecipe } from '../../types';

	export let recipes: SlimRecipe[];
</script>

<ol>
	{#each recipes as recipe}
		<li>
			<a target="_blank" rel="noreferrer" href="https://www.theguardian.com/{recipe.id}"
				>{recipe.headline.trim()}</a
			>
			|
			<button on:click={() => favs.toggle(recipe)}>
				{#if $favs.find((fav) => fav.id === recipe.id)}
					★
				{:else}
					☆
				{/if}
			</button>
		</li>
	{/each}
</ol>

<script lang="ts">
	import RecipeList from '../components/RecipeList.svelte';

	export let data: import('./$types').PageData;
</script>

<p>{data.recipes.length}</p>
<RecipeList recipes={data.recipes} />

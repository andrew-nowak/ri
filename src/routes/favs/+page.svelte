<script lang="ts">
	import RecipeList from '../../components/RecipeList.svelte';
	import { favs } from '../../stores/favs';
</script>

<RecipeList recipes={$favs} />

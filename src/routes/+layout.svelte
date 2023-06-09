<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav style="display: flex; justify-content: space-between;">
	<span>
		<a href="{base}/">guardian recipes index</a>
		|
		<a href="{base}/tags">tags</a>
		|
		<a href="{base}/favs">favs</a>
	</span>
	<form action="{base}/search" method="get">
		<input type="text" name="q" id="q" autocomplete="off" placeholder="search" required />
		<input type="submit" value="🕵️" />
	</form>
</nav>
<main>
	<slot />
</main>

<style>
	main,
	nav {
		margin: 15px auto;
	}
	:global(body) {
		margin: 40px auto;
		max-width: 650px;
		color: #f7e7ce;
		background-color: #24211e;
	}
	:global(a) {
		color: #b87b1c;
	}
</style>

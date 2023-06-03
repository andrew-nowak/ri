<nav>
	<a href="/">guardian recipes index</a>
	|
	<a href="/tags">tags</a>
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

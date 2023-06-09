<script lang="ts">
	import { base } from '$app/paths';

	export let data: import('./$types').PageData;

	let selectedData = data.data;

	function resliceData(e: MouseEvent) {
		const eventTarget = (e.target as HTMLInputElement)?.value;
		if (!eventTarget) {
			selectedData = data.data;
			return;
		}
		selectedData = data.data.filter(({ id }) => {
			if (eventTarget === 'profile') {
				return id.startsWith('profile');
			} else if (eventTarget === 'series') {
				return id.includes('series');
			} else if (eventTarget === 'meal') {
				return id.startsWith('food') && !id.includes('series');
			} else return true;
		});
	}
</script>

<div>
	<input type="radio" id="all" value="all" name="filter" on:click={resliceData} checked />
	<label for="all">all</label>
	<input type="radio" id="profile" value="profile" name="filter" on:click={resliceData} />
	<label for="profile">authors</label>
	<input type="radio" id="meal" value="meal" name="filter" on:click={resliceData} />
	<label for="meal">meal</label>
	<input type="radio" id="series" value="series" name="filter" on:click={resliceData} />
	<label for="series">series</label>
</div>
<ul>
	{#each selectedData as { id, webTitle, webUrl, count }}
		<li>
			<span style="display: flex; gap: 8px; align-items: center;">
				<a target="_blank" rel="noreferrer" href={webUrl} style="min-width: fit-content;">
					↣ (G)
				</a>
				|
				<a rel="noreferrer" href="{base}/tags/{id}" style="flex-shrink: 1;">
					{count}: {webTitle} ::: {id}
				</a>
			</span>
		</li>
	{/each}
</ul>

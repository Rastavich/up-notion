<script>
	import GetTransactions from '$lib/Components/getTransactions.svelte';
	import { onMount } from 'svelte';
	import { categories } from '$lib/categoryStore.js';
	let tabItems = [];
	let selectOption;

	onMount(async () => {
		$categories.forEach((item, index) => {
			tabItems[index] = { label: item.id, value: index + 1 };
		});
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<select bind:value={selectOption}>
		{#each $categories as item}
			<option value={item.id}>{item.id}</option>
		{/each}
	</select>
</div>
<div>
	{#if selectOption && selectOption != 'Please select a category'}
		{#key selectOption}
			{#if selectOption == 'All categories'}
				<GetTransactions filter={false} bind:itemId={selectOption} />
			{:else}
				<GetTransactions filter={true} bind:itemId={selectOption} />
			{/if}
		{/key}
	{/if}
</div>

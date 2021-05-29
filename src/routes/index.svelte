<script>
	import Tabs from '$lib/Components/Tabs.svelte';
	import GetTransactions from '$lib/Components/getTransactions.svelte';
	import { UP_API_URL } from '$lib/variables.js';
	import { onMount } from 'svelte';
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';
	let tabItems = [];
	let currentTab;

	onMount(async () => {
		const url = 'https://thingproxy.freeboard.io/fetch/https://api.up.com.au/api/v1/categories';
		const body = await api.get({ token: UP_API_URL, params: '' }, url);

		const response = await respond(body);
		console.log(response);
		const {
			body: { data }
		} = response;

		console.log(data);

		data.forEach((item, index) => {
			tabItems[index] = { label: item.id, value: index + 1 };
		});
	});

	$: currentTab;
	console.log(currentTab);

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Tabs bind:activeTabValue={currentTab} items={tabItems} />

{#if currentTab}
	{#key currentTab}
		<GetTransactions bind:itemId={tabItems[currentTab - 1].label} />
	{/key}
{/if}

<style>
</style>

<script>
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';
	import AddToNotion from '$lib/Components/addToNotion.svelte';
	import { trans, transChecked } from '$lib/transactionStore.js';
	import { UP_API_URL } from '$lib/variables.js';
	
	export let itemId;
	let transactions = [];
	let links = {};
	let error;

	async function getTransactions() {
		const url =
			'https://thingproxy.freeboard.io/fetch/https://api.up.com.au/api/v1/accounts/582be906-8f42-41c6-8177-b53d295c1343/';
		const body = await api.get(
			{ token: UP_API_URL, params: 'transactions?filter[category]=' + itemId },
			url
		);

		const accountDetails = await respond(body);
		const {
			body: { data }
		} = accountDetails;

		transactions = data;
		links = accountDetails.body.links;
		console.log(transactions);
		trans.set(transactions);

		return transactions;
	}

	async function page(direction) {
		let error = 'No other pages in that direction';
		let page;

		if (direction == 'next') {
			page = links.next;
		}
		if (direction == 'previous') {
			page = links.prev;
		}

		// TODO: Handle no next or previous page a lot better
		if (page == null) {
			return error;
		}

		const body = await api.get({ token: UP_API_URL }, page);
		const accountDetails = await respond(body);

		const {
			body: { data }
		} = accountDetails;
		transactions = data;
		links = accountDetails.body.links;

		trans.set(transactions);
	}

	function checkedTransactions(transaction) {
		transChecked.update((checkedTrans) => [...checkedTrans, transaction]);
	}

	const promise = getTransactions();

</script>

<div class="container">
	<div class="header">
		<button on:click={() => page('previous')}>Previous</button>
		<button on:click={() => page('next')}>Next</button>
	</div>

	<div class="transactions">
		{#if error}
			{error}
		{/if}
		{#await promise}
			<h1>....Loading transactions</h1>
		{:then transactions}
			{#if transactions.length === 0}
				<p>No transactions in this category - try another.</p>
			{:else}
				{#each transactions as transaction}
					<ul>
						<li>
							<div class="transaction">
								<div>
									<input
										type="checkbox"
										on:change={() => {
											checkedTransactions(transaction);
										}}
									/>
								</div>
								<div>
									{transaction.attributes.description}&nbsp; Amount:
								</div>
								<div>
									{transaction.attributes.createdAt}
								</div>
								<div>
									{transaction.attributes.amount.value}
								</div>
							</div>
						</li>
					</ul>
				{/each}

				<div class="notion-add">
					<AddToNotion buttonText="Add all transactions to notion" checked="false" />
					<AddToNotion buttonText="Add ONLY CHECKED transactions to notion" checked="true" />
				</div>
			{/if}
		{/await}
	</div>
</div>

<style>
	.container {
		padding: 2rem;
	}
	.transaction {
		display: grid;
		grid-template-columns: 3rem 20rem 15rem 20rem;
		border-bottom: 1px solid lightgrey;
	}
	.header {
		position: sticky;
		height: 5rem;
		align-content: center;
		margin: 0 auto;
	}
	ul {
		display: grid;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		width: 20rem;
	}
	li {
		box-sizing: border-box;
	}

	.notion-add {
		margin-top: 2rem;
	}

</style>

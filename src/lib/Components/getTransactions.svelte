<script>
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';
	import AddToNotion from '$lib/Components/addToNotion.svelte';
	import { trans, transChecked } from '$lib/transactionStore.js';
	import { UP_API_URL } from '$lib/variables.js';

	export let itemId;
	export let filter;
	export let selectMonth;

	let transactions = [];
	let nextDisabled = true;
	let prevDisabled = true;
	let links = {};
	let slug;
	let error;
	let loadingNext = false;
	let pageError = 'No other pages in that direction';

	/**
	 *
	 */
	async function getTransactions() {
		const url = 'https://thingproxy.freeboard.io/fetch/https://api.up.com.au/api/v1';
		console.log(itemId);

		if (filter) {
			slug =
				'/accounts/582be906-8f42-41c6-8177-b53d295c1343/transactions?filter[category]=' + itemId;
		} else if (filter && selectMonth) {
			slug =
				'/accounts/582be906-8f42-41c6-8177-b53d295c1343/transactions?filter[category]=' + itemId;
		} else {
			slug = '/accounts/582be906-8f42-41c6-8177-b53d295c1343/transactions';
		}
		const body = await api.get(
			{
				token: UP_API_URL,
				params: slug
			},
			url
		);

		const accountDetails = await respond(body);
		const {
			body: { data }
		} = accountDetails;

		setTransactions(body, data);
	}

	/**
	 * Pagination function which takes the direction and returns the new dataset for that direction.
	 *
	 * @param {string} direction
	 */
	async function page(direction) {
		let page = null;

		if (direction == 'next') {
			page = links.next;
		}
		if (direction == 'previous') {
			page = links.prev;
		}

		// TODO: Handle no next or previous page a lot better
		if (page == null) {
			return pageError;
		}

		promise = '';
		transactions = '';
		loadingNext = true;

		const body = await api.get({ token: UP_API_URL }, page);
		const accountDetails = await respond(body);
		const {
			body: { data }
		} = accountDetails;

		setTransactions(body, data);
	}

	/**
	 *
	 * @param body
	 * @param data
	 */
	function setTransactions(body, data) {
		links = body.links;

		console.log(links.next);

		!links.next ? (nextDisabled = true) : (nextDisabled = false);
		!links.prev ? (prevDisabled = true) : (prevDisabled = false);

		data.forEach((element, index) => {
			const {
				attributes: {
					description,
					createdAt,
					amount: { value }
				}
			} = element;

			// Format the date
			let createdDate = new Date(createdAt);

			transactions = [
				...transactions,
				{
					id: index,
					transValue: value,
					transDescription: description,
					transCreated: createdDate.toLocaleString()
				}
			];
		});

		loadingNext = false;

		trans.set(transactions);
		promise = transactions;
	}

	function checkedTransactions(transaction) {
		transChecked.update((checkedTrans) => [...checkedTrans, transaction]);
	}

	let promise = getTransactions();
</script>

<div class="container">
	<div class="header">
		<button disabled={prevDisabled} on:click={() => page('previous')}>Previous</button>
		<button disabled={nextDisabled} on:click={() => page('next')}>Next</button>
	</div>

	<div class="transactions">
		{#if error}
			{error}
		{/if}
		{#await promise}
			<h1>....Loading transactions</h1>
		{:then transactions}
			{#if transactions.length === 0 && loadingNext === false}
				<p>No transactions in this category - try another.</p>
			{:else if loadingNext === true}
				<h1>Loading...</h1>
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
									{transaction.transDescription}
								</div>
								<div>
									{transaction.transValue}
								</div>
								<div>
									{transaction.transCreated}
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

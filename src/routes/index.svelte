
<script context="module">

	import GetTransactions from '$lib/Components/getTransactions.svelte';
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';
	let notionApi = import.meta.env.VITE_NOTION_API;
	let query = 'users/:id';
	let db = {};

	async function getDatabases (event) {
		
		const body = await api.get({
			token: notionApi,
			params: 'databases/72ed0bc8a5c24fde86b8e13f4589f465',
		})
			
		return respond(body);	
	}

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>
		
	</h1>

	<GetTransactions />

	
	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

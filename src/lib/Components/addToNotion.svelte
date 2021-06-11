<script>
	import { trans, transChecked } from '$lib/transactionStore.js';
	import { NOTION_API, NOTION_DATABASE_ID } from '$lib/variables.js';
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';
	export let checked;
	export let buttonText;
	let data = {};

	async function getBody(item, index) {
		if (!checked) {
			data = JSON.stringify({
				parent: {
					database_id: `${NOTION_DATABASE_ID}`
				},
				properties: {
					Date: {
						id: 'MGZE',
						type: 'date',
						date: {
							start: $trans[index].attributes.createdAt.toString()
						}
					},
					Type: {
						id: '[c{o',
						type: 'select',
						select: {
							id: 'e1661fc5-e5f8-444b-8667-a34c48e419f0',
							name: 'Expense',
							color: 'yellow'
						}
					},
					Amount: {
						id: 'a@LY',
						type: 'number',
						number: parseInt($trans[index].attributes.amount.value)
					},
					Name: {
						id: 'title',
						type: 'title',
						title: [
							{
								type: 'text',
								text: {
									content: $trans[index].attributes.description,
									link: null
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: 'default'
								},
								plain_text: $trans[index].attributes.description,
								href: null
							}
						]
					}
				}
			});
		} else {
			data = JSON.stringify({
				parent: {
					database_id: `${NOTION_DATABASE_ID}`
				},
				properties: {
					Date: {
						id: 'MGZE',
						type: 'date',
						date: {
							start: $transChecked[index].transCreated.toString()
						}
					},
					Type: {
						id: '[c{o',
						type: 'select',
						select: {
							id: 'e1661fc5-e5f8-444b-8667-a34c48e419f0',
							name: 'Expense',
							color: 'yellow'
						}
					},
					Amount: {
						id: 'a@LY',
						type: 'number',
						number: parseInt($transChecked[index].transValue)
					},
					Name: {
						id: 'title',
						type: 'title',
						title: [
							{
								type: 'text',
								text: {
									content: $transChecked[index].transDescription,
									link: null
								},
								annotations: {
									bold: false,
									italic: false,
									strikethrough: false,
									underline: false,
									code: false,
									color: 'default'
								},
								plain_text: $transChecked[index].transDescription,
								href: null
							}
						]
					}
				}
			});
		}

		const url = 'https://thingproxy.freeboard.io/fetch/https://api.notion.com/v1/';
		const body = await api.post(
			data,
			{
				token: NOTION_API,
				params: 'pages'
			},
			url
		);

		const db = await respond(body);
	}

	function addToNotion() {
		if (!checked) {
			console.log($trans);
			$trans.forEach(getBody);
		} else {
			console.log($transChecked);
			$transChecked.forEach(getBody);
		}
	}

</script>

<button on:click={addToNotion}>{buttonText}</button>

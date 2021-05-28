<script>
	import { trans } from '$lib/transactionStore.js';
	import { NOTION_API, NOTION_DATABASE_ID } from '$lib/variables.js';
	import * as api from '$lib/api.js';
	import { respond } from '$lib/respond.js';

	async function getBody(item, index) {
		const data = JSON.stringify({
			parent: {
				database_id: `${NOTION_DATABASE_ID}`
			},
			properties: {
				Tags: {
					select: {
						id: '28aa9649-d41d-4753-b0d2-b45e4f3fca34',
						name: 'Weekly',
						color: 'default'
					}
				},
				Date: {
					id: 'MGZE',
					type: 'date',
					date: {
						start: $trans[index].attributes.createdAt.toString()
					}
				},
				Company: {
					id: 'NEcW',
					type: 'select',
					select: {
						id: 'b7994623-b46e-425d-93cd-cea0d2368b9e',
						name: 'Food',
						color: 'yellow'
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
		$trans.forEach(getBody);
	}

</script>

<section>
	<button on:click={addToNotion}>Add transactions to Notion</button>
</section>

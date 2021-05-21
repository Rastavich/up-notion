let dbId = import.meta.env.VITE_NOTION_DATABASE_ID;

export const createPage = JSON.stringify({
	parent: {
		database_id: `${dbId}`
	},
	properties: {
		Tags: {
			id: 'FB|y',
			type: 'select',
			select: {
				id: '6e86cb06-1464-4af3-9ba7-3a8afef386f3',
				name: 'Monthly',
				color: 'brown'
			}
		},
		Company: {
			id: 'NEcW',
			type: 'select',
			select: {
				id: '3b433831-d710-47ad-963b-bed522e13f8d',
				name: 'Description',
				color: 'default'
			}
		},
		Total: {
			id: 'Qvu`',
			type: 'formula',
			formula: {
				type: 'number',
				number: null
			}
		},
		Type: {
			id: '[c{o',
			type: 'select',
			select: {
				id: 'b892d96a-4509-4071-bc2b-69beab1ed15b',
				name: 'Income',
				color: 'orange'
			}
		},
		Amount: {
			id: 'a@LY',
			type: 'number',
			number: 500
		},
		Name: {
			id: 'title',
			type: 'title',
			title: [
				{
					type: 'text',
					text: {
						content: 'TESTING',
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
					plain_text: 'TESTING',
					href: null
				}
			]
		}
	}
});

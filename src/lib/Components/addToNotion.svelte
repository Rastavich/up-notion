<script>
    import { onMount } from 'svelte';
    import { trans } from '$lib/transactionStore.js';
    import { createPage } from '$lib/requests.js';
    import { NOTION_API, NOTION_DATABASE_ID } from '$lib/variables.js';

    import * as api from '$lib/api.js';
    import {
        respond
    } from '$lib/respond.js';

   async function getBody(item, index) {
  
    const data = JSON.stringify({
        parent: {
          database_id: `${NOTION_DATABASE_ID}`
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
              name: 'Expense',
              color: 'orange'
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
          data
      , {token: NOTION_API, params: 'pages'},
      url)


      const db = await respond(body);

   }

   function addToNotion() {
     $trans.forEach(getBody);
   }
  
</script>

<section>
   <button on:click={addToNotion}>Add transactions to Notion</button> 
</section>

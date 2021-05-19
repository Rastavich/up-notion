<script>
   import { onMount } from 'svelte';
//   export const hydrate = false;

//   import * as api from '$lib/api.js';
//   import {
//       respond
//   } from '$lib/respond.js';
//   let notionApi =
//       import.meta.env.VITE_NOTION_API;


//   var raw = JSON.stringify({
//   "filter": {
//     "or": [
//       {
//         "property": "Type",
//         "select": {
//           "equals": "Income"
//         }
//       }
//     ]
//   },
//   "sorts": [
//     {
//       "property": "Amount",
//       "direction": "ascending"
//     }
//   ]});

// export async function load({ page, fetch }) {
//       const body = await api.post(
//           raw
//       , {token: notionApi, params: 'databases/72ed0bc8a5c24fde86b8e13f4589f465/query'})


//       const db = await respond(body);

//       return {
//         props: { 
//           data: db
//         }
//       };
//   }

  export let data;
  // console.log(data.body.results[0].properties.Tags)
  $: onMount(async () => {
    console.log('Add to notion: ', data);
  });
</script>

<section>
   <button>Add transactions to Notion</button> 
</section>

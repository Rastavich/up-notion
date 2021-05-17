<script context="module">
  export const hydrate = false;

//   import { enhance } from '$lib/form';
  import * as api from '$lib/api.js';
  import {
      respond
  } from '$lib/respond.js';
  let notionApi =
      import.meta.env.VITE_NOTION_API;


  var raw = JSON.stringify({
  "filter": {
    "or": [
      {
        "property": "Type",
        "select": {
          "equals": "Income"
        }
      }
    ]
  },
  "sorts": [
    {
      "property": "Amount",
      "direction": "ascending"
    }
  ]});

export async function load({ page, fetch }) {
      const body = await api.post(
          raw
      , {token: notionApi, params: 'databases/72ed0bc8a5c24fde86b8e13f4589f465/query'})


      const db = await respond(body);

      return {
        props: { 
          data: db
        }
      };
  }

</script>

<script>
  export let data;
  console.log(data.body.results[0].properties.Tags)

</script>

<section>
    <h1>
        This is the getDatabase component
    </h1>
     <form
		class="new"
		method="post"
        use:data
    >
     {#each data.body.results as i}
        <input aria-label="Test" type="text" name="text" value={i.properties.Amount.number} />
        <input aria-label="Test" type="text" name="text" value={i.properties.Tags} />
        <input aria-label="Test" type="text" name="text" value={i.properties.Tags} />
        <input aria-label="Test" type="text" name="text" value={i.properties.Tags} />
        <input aria-label="Test" type="text" name="text" value={i.properties.Tags} />
        <input aria-label="Test" type="text" name="text" value={i.properties.Tags} />

     {/each}

    
    
    </form>
    
</section>

<script>
  import { onMount } from 'svelte';
  import AddToNotion from '$lib/Components/addToNotion.svelte';
  import { trans } from '$lib/transactionStore.js';
  import { UP_API_URL } from '$lib/variables.js';
  let transactions = [];  

  import * as api from '$lib/api.js';
    import {
        respond
    } from '$lib/respond.js';

  onMount(async () => {
    const url = 'https://thingproxy.freeboard.io/fetch/https://api.up.com.au/api/v1/accounts/582be906-8f42-41c6-8177-b53d295c1343/';
    const body = await api.get(
    {token: UP_API_URL, params: 'transactions?filter[category]=groceries'},
    url)
   
    const accountDetails = await respond(body);
    const { body: { data } } = accountDetails;

    console.log(data)

    transactions = data;

    trans.set(transactions);
   
  });

</script>

<div class="container">
  {#await transactions}
    <h1>....Loading transactions </h1>
  {:then}
    {#each transactions as transaction}
      <ul>
        <li>
          {transaction.attributes.description}&nbsp; Amount:
          {transaction.attributes.amount.value}
        </li>
      </ul>
    {/each}
    <AddToNotion />
  {/await}
</div>  


<style>
  .container {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 2rem;
  }
  p {
    margin-left: 10px;
    margin-right: 10px;
  }
  ul {
    padding: 0;
    list-style-type: none;
    margin-block-end: 0;
    margin-right: 5rem;
  }
  li {
    box-sizing: border-box;
  }
  button {
    margin-top: 3rem;
  }
</style>


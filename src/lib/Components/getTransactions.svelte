<script>
  import { onMount } from 'svelte';
  import AddToNotion from '$lib/Components/addToNotion.svelte';

  let upApi = import.meta.env.VITE_UP_API;
  let transactions = [];  

  onMount(async () => {
    var url =
      "https://thingproxy.freeboard.io/fetch/https://api.up.com.au/api/v1/accounts/582be906-8f42-41c6-8177-b53d295c1343/transactions?filter[category]=groceries";

    
    const res = await fetch(url, {
      headers: {
        method: "GET",
        Authorization:
          "Bearer " + upApi
      }
    });

    const accountDetails = await res.json();
    const { data } = accountDetails;
    
    console.log('transactions: ', data);

    transactions = data;
    AddToNotion.data = transactions;
   
  });

</script>

<!-- <div class="totals">
  <h3>Spent total</h3>
  <p>${spent}</p>
  <h3>Saved total</h3>
  <p>${saved}</p>
  <h3>Transactions Total</h3>
  <p>${total}</p>
</div>
-->
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
    <AddToNotion data={transactions}/>
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


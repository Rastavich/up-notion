<!--  
<script>
  import { beforeUpdate } from "svelte";
  let upApi = import.meta.env.VITE_UP_API;
  export let accountId;
  export let idChanged;
  let transactions = [];
  let spent = 0.0;
  let saved = 0.0;
  let total = 0.0;
  async function getTransactions() {
    var url =
      // Local Development API's
      "https://thingproxy.freeboard.io/fetch/api.up.com.au/api/v1/accounts/" +
      accountId +
      "/transactions";
    // prod API
    // "https://api.up.com.au/api/v1/accounts/" + accountId + "/transactions";
    const res = await fetch(url, {
      headers: {
        method: "GET",
        Authorization:
          "Bearer " + upApi
      },
    });
    const accountDetails = await res.json();
    const { data } = accountDetails;
    transactions = await data;
    for (var i = 0; i < transactions.length; i++) {
      const { attributes } = transactions[i];
      // console.log(attributes);
      const { amount } = attributes;
      // console.log(amount);
      if (amount.value < 0) {
        spent = spent - parseInt(amount.value);
      } else {
        saved += parseInt(amount.value);
      }
      total = saved - spent;
    }
  }
  beforeUpdate(async () => {
    if (idChanged) {
      spent = 0.0;
      saved = 0.0;
      total = 0.0;
      getTransactions().then((idChanged = false));
    }
  });
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 35%;
    margin: 0 auto;
  }
  .totals {
    width: 50%;
    margin: 0 auto;
    display: flex;
  }
  p {
    margin-left: 10px;
    margin-right: 10px;
  }
  ul {
    padding: 0;
  }
  li {
    padding: 10px;
    box-sizing: border-box;
  }
</style>

<button on:click={getTransactions}>Get them transactions</button>

<div class="totals">
  <h3>Spent total</h3>
  <p>${spent}</p>
  <h3>Saved total</h3>
  <p>${saved}</p>
  <h3>Transactions Total</h3>
  <p>${total}</p>
</div>

<div class="container">
  {#each transactions as transaction}
    <ul>
      <li>
        {transaction.attributes.description}&nbsp; Amount:
        {transaction.attributes.amount.value}
      </li>
    </ul>
  {:else}
    <p>loading...</p>
  {/each}
</div> -->

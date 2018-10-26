<template>
  <div id="trades-section">
    <h1>Trades<sup id="live-status">live</sup></h1>
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Price ( {{ currency }} )</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item, index) in tradesData' :key='index'>
          <td class="amount">{{ item.amount | amountFilter }}</td>
          <td class="price">{{ item.price | priceFilter }}</td>
          <td class="dateTime">{{ item.datetime | getTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Trades',
  computed: {
    tradesData() {
      // eslint-disable-next-line
      return this.$store.state.trades.reverse();
    },
    currency: function() {
      const pair = this.$store.state.pair;
      return pair.split('/')[1];
    },
  },
  filters: {
    getTime(time) {
      const d = moment(time).format("DD-MM-YY  hh:mm:ss");
      return d;
    },
    amountFilter(content) {
      return content.toFixed(5);
    },
    priceFilter(content) {
      return content.toFixed(3);
    },
  },
};
</script>

<style>
#trades-section {
  width: 100%;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
  background-color: white;
}
h1 {
  margin: 0;
  font-weight: 400;
  font-size: 150%;
  margin-bottom: 20px;
}
#live-status {
  font-size: 40%;
  color: #fff;
  background-color: #f70000;
  border: 1px solid #fff;
  padding: 3px;
  margin-left: 5px;
}
table {
  margin: auto;
}
th {
  padding: 10px 70px;
}
td {
  padding: 3px 5px;
}
tbody tr:nth-child(even) {
  background-color: #ececec;
  color: #000;
}
tr:nth-child(even) {
  border-right: 2px solid greenyellow;
}
thead tr {
  background-color: #636363;
  color: #fff;
}
</style>

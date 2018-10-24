<template>
  <div id="trades-section">
    <h1>Trades<sup id="live-status">live</sup></h1>
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item, index) in tradesData' :key='index'>
          <td>{{ item.amount }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.datetime }}</td>
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
  },
};
</script>

<style>
#trades-section {
  width: 100%;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
  background: rgb(74, 36, 84);
  background: linear-gradient(
    0deg,
    rgba(74, 36, 84, 1) 0%,
    rgba(178, 0, 77, 1) 50%
  );
}
h1 {
  margin: 0;
  color: #fff;
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
  color: #fff;
}
td {
  color: #fff;
  padding: 2px 10px;
}
tr:nth-child(odd) {
  background-color: #7785aa;
}
</style>

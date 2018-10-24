<template>
  <div id="exchange-section">
    <h1>Exchange</h1>
    <select :value="selected_exchange" @change="setExchange">
      <option disabled value="">Please Select</option>
      <option v-for='item in exchanges' :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import ccxt from 'ccxt';
import { mapActions } from 'vuex';

export default {
  name: 'Exchange',
  data() {
    return {
      exchanges: {},
      selected_exchange: '',
    };
  },
  methods: {
    ...mapActions(['getPairs']),
    getExchanges() {
      ccxt.exchanges.forEach((id) => {
        const exchange = new ccxt[id]();
        this.exchanges[id] = exchange.name;
      });
    },
    setExchangeId() {
      let currency_id;
      for (const id in this.exchanges) {
        if (this.selected_exchange == this.exchanges[id]) {
          currency_id = id;
        };
      };
      return currency_id;
    },
    setExchange(element) {
      this.selected_exchange = element.target.value;
      const selected_id = this.setExchangeId();
      this.$store.commit('setExchange', selected_id);
      this.getPairs();
    },
  },
  created() {
    this.getExchanges();
  },
  computed: {
    exchange() {
      return this.$store.state.exchange;
    },
  },
};
</script>

<style scoped>
  select {
    font-size: 14px;
    padding: 5px;
  }
  #exchange-section {
    width: 100%;
    height: 100vh;
    text-align: center;
    margin: auto;
    padding-top: 40px;
    background: rgb(74, 36, 84);
    background: linear-gradient(
      0deg,
      rgba(74, 36, 84, 1) 0%,
      rgba(178, 0, 77, 1) 50%
    );
  }
  h1 {
    color: white;
    margin: 0;
    padding-top: 70px;
    padding-bottom: 20px;
    font-weight: 400;
    font-size: 150%;
  }
</style>

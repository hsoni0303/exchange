import Vue from 'vue';
import Vuex from 'vuex';

const ccxt = require('ccxt');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    exchange: '',
    pairs: [],
    pair: '',
    trades: [],
  },
  mutations: {
    setExchange(state, payload) {
      // eslint-disable-next-line
      state.exchange = payload;
    },
    setPairs(state, payload) {
      // eslint-disable-next-line
      state.pairs = payload;
    },
    setPair(state, payload) {
      // eslint-disable-next-line
      state.pair = payload;
    },
    setTrades(state, payload) {
      // eslint-disable-next-line
      state.trades = payload;
    },
  },
  actions: {
    async getPairs({ commit, state }) {
      const proxy = 'http://localhost:8081/';
      const newExchange = new ccxt[state.exchange]({ proxy });
      const pairs = await newExchange.loadMarkets();
      commit('setPairs', pairs);
    },
    async getTrades({ commit, state }) {
      const proxy = 'http://localhost:8081/';
      const newExchange = new ccxt[state.exchange]({ proxy });
      const since = newExchange.seconds();
      const symbol = state.pair;
      const limit = 20;
      const trades = await newExchange.fetchTrades(symbol, since, limit);
      commit('setTrades', trades);
    },
  },
});

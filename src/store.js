import Vue from 'vue';
import Vuex from 'vuex';
import MutationsSharer from 'vuex-shared-mutations';

const ccxt = require('ccxt');

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [MutationsSharer({ predicate: ['setExchange', 'setPairs', 'setPair', 'setTrades'] })],
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
      // eslint-disable-next-line
      const exchange = state.exchange;
      // eslint-disable-next-line
      const pair = state.pair;
      const newExchange = new ccxt[state.exchange]({ proxy });
      const since = newExchange.seconds();
      const symbol = state.pair;
      const limit = 20;
      const timer = setInterval(() => {
        newExchange.fetchTrades(symbol, since, limit)
          .then((trades) => {
            if (exchange !== state.exchange) {
              clearInterval(timer);
              return;
            }
            if (pair !== state.pair) {
              clearInterval(timer);
              return;
            }
            commit('setTrades', trades);
          });
      }, 2000);
    },
  },
});

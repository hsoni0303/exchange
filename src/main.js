import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Exchange from './components/Exchange.vue';
import Pairs from './components/Pairs.vue';
import Trades from './components/Trades.vue';
import '../node_modules/golden-layout/src/css/goldenlayout-base.css';
import '../node_modules/golden-layout/src/css/goldenlayout-dark-theme.css';

Vue.config.productionTip = false;

const $ = require('jquery');

window.jQuery = $;
window.$ = $;

Vue.component('app', App);
Vue.component('exchange', Exchange);
Vue.component('pair', Pairs);
Vue.component('trades', Trades);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

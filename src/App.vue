<template>
  <div id="app">
  </div>
</template>

<script>

import GoldenLayout from 'golden-layout';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
  },
  mounted() {
    const config = {
      setting: {
        hasHeader: true,
        showPopoutIcon: true,
        showCloseIcon: true,
        showMaximizeIcon: true,
      },
      dimensions: {
        borderwidth: 2,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200,
      },
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'component',
                  componentName: 'Exchange',
                },
                {
                  type: 'component',
                  componentName: 'Pair',
                },
              ],
            },
            {
              type: 'component',
              componentName: 'Trades',
            },
          ],
        },
      ],
    };

    let gLayout,
      savedState = localStorage.getItem('savedState');

    if (savedState !== null) {
      gLayout = new GoldenLayout(JSON.parse(savedState));
    } else {
      gLayout = new GoldenLayout(config, $('#app'));
    }

    const self = this;

    gLayout.on('stateChanged', () => {
      const state = JSON.stringify(gLayout.toConfig());
      localStorage.setItem('savedState', state);
    });

    gLayout.registerComponent('Exchange', (container, state) => {
      const id = 'exchange';
      const html = `<div id=${id}></div>`;
      container.getElement().html(html);
      setTimeout(() => {
        const ExchangeComponentConstructor = Vue.component('exchange').extend({
          store: self.$store,
        });
        const vm = new ExchangeComponentConstructor();
        vm.$mount('#exchange');
      });
    });

    gLayout.registerComponent('Pair', (container, state) => {
      const id = 'pair';
      const html = `<div id=${id}></div>`;
      container.getElement().html(html);
      setTimeout(() => {
        const ExchangeComponentConstructor = Vue.component('pair').extend({
          store: self.$store,
        });
        const vm = new ExchangeComponentConstructor();
        vm.$mount('#pair');
      });
    });

    gLayout.registerComponent('Trades', (container, state) => {
      const id = 'trades';
      const html = `<div id=${id}></div>`;
      container.getElement().html(html);
      setTimeout(() => {
        const ExchangeComponentConstructor = Vue.component('trades').extend({
          store: self.$store,
        });
        const vm = new ExchangeComponentConstructor();
        vm.$mount('#trades');
      });
    });

    gLayout.init();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.lm_item {
  width: 50vw;
  height: 100vh;
}
</style>

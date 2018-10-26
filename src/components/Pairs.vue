<template>
  <div id="pair-section">
    <h1>Pair</h1>
    <div class="wrapper-dropdown">
      <select :value="selected_pair" @change="getPair">
        <option disabled value="">Please Select</option>
        <option v-for="pair in pairs" :value="pair.symbol" :key="pair.id">
          {{ pair.symbol }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'pair',
  data() {
    return {
      selected_pair: '',
    };
  },
  computed: {
    pairs() {
      return this.$store.state.pairs;
    },
    pair() {
      return this.$store.state.pair;
    },
  },
  methods: {
    ...mapActions(['getTrades']),
    getPair(element) {
      const pair = element.target.value;
      this.$store.commit('setPair', pair);
      this.getTrades();
    },
  },
};
</script>

<style scoped>
  select {
      font-size: 14px;
      padding: 5px;
    }
  #pair-section {
    width: 100%;
    height: 100vh;
    text-align: center;
    margin: auto;
    background-color: white;
  }
  h1 {
    margin: 0;
    padding-top: 70px;
    padding-bottom: 20px;
    font-weight: 400;
    font-size: 150%;
  }
  #pair-section input {
    border-style: none;
    border-radius: 3%;
    padding: 10px;
  }
</style>

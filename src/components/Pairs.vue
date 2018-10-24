<template>
  <div id="pair-section">
    <h1>Pairs</h1>
    <select :value="selected_pair" @change="getPair">
      <option disabled value="">Please Select</option>
      <option v-for="pair in pairs" :value="pair.symbol" :key="pair.id">
        {{ pair.symbol }}
      </option>
    </select>
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
    margin: 0 auto;
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
  #pair-section input {
    border-style: none;
    border-radius: 3%;
    padding: 10px;
  }
</style>

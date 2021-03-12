<template>
  <div class="chart">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    'Chart' : Chart,
  }
};
</script>

<style scoped>
h1 {
    text-align: center;
    background-color: purple;
    color: white;
    padding: 20px;
}
</style>
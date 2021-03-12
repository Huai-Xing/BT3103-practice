<template>
  <div class="chart">
    <h1>Bar Chart</h1>
    <Barchart></Barchart>
  </div>
</template>

<script>
import Barchart from "./BarChart.js";
export default {
  components: {
    'Barchart' : Barchart
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
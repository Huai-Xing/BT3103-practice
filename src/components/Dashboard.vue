<template>
  <div>
    <Header></Header>
    <BarChart></BarChart>
    <APIChart></APIChart>
  </div>
</template>

<script>
import Header from './Header.vue'
import BarChart from "./charts/BarChart.vue";
import APIChart from "./CallAPI.vue";

export default {
  components: {    
    'Header': Header,
    'BarChart': BarChart,
    'APIChart': APIChart,
  }
};
</script>

<style>

</style>
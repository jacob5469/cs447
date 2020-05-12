<template>
  <div id="app">
    <Graph class="column" />
  </div>
</template>

<script>
import Vue from "vue";
import Graph from "./Graph.vue";

export default {
  components: { Graph }
};
</script>

<style>
.app {
  width: 100%;
  background-color: green;
}

.column {
  width: 100%;
  background-color: orange;
}

.bar {
  width: 100%;
  background-color: grey;
}
</style>

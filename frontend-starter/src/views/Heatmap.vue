<template>
  <div>
    <div class="main-view">
      <Map ref="map" class="map"/>
      <Graphs class="graphs"/>
    </div>
    <Sidebar @Some_event="doSomething" ref="sidebar" class="sidebar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "../components/Map.vue";
import Sidebar from "../components/Sidebar.vue";
import Graphs from "../components/Graphs.vue";

@Component({
  components: {
    Map,
    Graphs,
    Sidebar
  }
})
export default class Heatmap extends Vue {


  mounted() {
     

    console.log("");


  }

  doSomething(...args) {


    console.log(args);

    console.log((this.$refs.map as any).testFunction(args));


  }

  constructor() {

    super();

  }
}
</script>

<style>
.main-view {
  width: 100%;
  height: 100%;
}

.map {
  width: 80%;
  height: 100%;
}

.graphs {
  width: 80%;
  height: 100%;
}

.sidebar {
  width: 20%;
  height: 100%;
  position: fixed;
  right: 0px;
}
</style>

<template>
  <div>
    <div class="main-view">
      <Map ref="map" class="map"/>
      <Graphs class="graphs"/>
    </div>
    <Sidebar @APIData="passData" ref="sidebar" class="sidebar" />
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

  passData(args: any) {
    console.log(args);
    fetch('http://localhost:3000/api/data', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
      body: args
    })
    .then((response) => {
      response.json()
        .then( (res) => {
          //console.log(res);
          (this.$refs.map as Map).receiveMapData(res);
        });
    })
    .then((data) => {
      //console.log(data);
      // this.$emit("Some_event", "Some custom event");
    });
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

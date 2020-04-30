<template>
  <div>
    <div class="main-view">
      <Map ref="map" class="map" />
    </div>
    <Sidebar @filterData="filterMapData" monthPicker=true :defaultFilter="defFilter" ref="sidebar" class="sidebar" />
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
export default class Pinmap extends Vue {
  private defFilter = {crimemonth: [new Date().getFullYear() + "-" + (new Date().getMonth() + 1)]}

  mounted() {
    this.configureMap([]);
  }

  async filterMapData(filters: any) {
    // Await for the response, then await for the response body to give back JSON
    const data = await (
      await fetch("http://localhost:3000/api/map/data", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: filters
      })
    ).json();

    this.configureMap(data);
  }

  configureMap(mapData: any) {
    const map = this.$refs.map as Map;
    map.resetMap();
    map.setMapData(mapData);
    map.addMarkers();
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
  height: 10%;
}

.graphs {
  width: 80%;
  height: 80%;
}

.sidebar {
  width: 20%;
  height: 100%;
  position: absolute;
  right: 0px;
}
</style>

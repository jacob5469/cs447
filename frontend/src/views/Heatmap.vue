<template>
  <div>
    <div class="main-view">
      <Loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
        loader="bars"
        color="#007bff"
        height="128"
        width="128"
      ></Loading>
      <Map ref="map" class="map" disabled="loading" />
    </div>
    <Sidebar @filterData="filterMapData" monthPicker="false" ref="sidebar" class="sidebar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "../components/Map.vue";
import Sidebar from "../components/Sidebar.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

@Component({
  components: {
    Map,
    Sidebar,
    Loading
  }
})
/**
 * View that contains the logic for the heatmap page
 */
export default class Heatmap extends Vue {
  // When true, triggers the loading bars to appear
  private isLoading = true;

  mounted() {
    this.configureMap([]);
  }

  /**
   * Function called when sidebar emits the filterData event
   * @param filters filters from the sidebar
   */
  async filterMapData(filters: any) {
    this.isLoading = true;

    // Await for the response, then await for the response body to give back JSON
    const data = await (
      await fetch("http://localhost:3000/api/map/data", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: filters
      })
    ).json();

    this.configureMap(data);

    this.isLoading = false;
  }

  /**
   * Resets, adds new data to, and adds a heatmap layer to the map component
   * @param mapData Data points to add to the map
   */
  configureMap(mapData: any) {
    const map = this.$refs.map as Map;
    map.resetMap();
    map.setMapData(mapData);
    map.addHeatmap();
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

<template>
  <div>
    <Map class="map"/>
    <Sidebar class="sidebar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "../components/Map.vue";
import Sidebar from "../components/Sidebar.vue";

@Component({
  components: {
    Map,
    Sidebar
  }
})
export default class Heatmap extends Vue {
}
</script>

<style>
.map {
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

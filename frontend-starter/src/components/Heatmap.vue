<template>
  <div id="map-canvas" class="heatmap"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet.heat";
import * as L from "leaflet";

@Component({
  components: {
    LMap,
    LTileLayer
  }
})
export default class Heatmap extends Vue {
  private latlngs = [
    [47.334852, -1.509485, 1],
    [47.342596, -1.328731, 0.75],
    [47.342596, -1.329731, 1],
    [47.342596, -1.329731, 1],
    [47.342596, -1.329731, 1],
    [47.241487, -1.190568, 0.5],
    [47.234787, -1.358337, 1]
  ];

  constructor() {
    super();
  }
  //Mounted is called automatically when the component loads by Vue
  mounted() {

    this.setupCanvas();
 
  }

  setupCanvas() {

    const map = L.map("map-canvas").setView([47.334852, -1.509485], 12);

    const tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let addressPoints = 0 as any; //bad code

    // Ignore if you see a error here
    // addressPoints = require("./address_points.js").default;

    // addressPoints = addressPoints.map((p: any) => [p[0], p[1]]);

    addressPoints = this.latlngs.map((p: any) => [p[0], p[1]]);

    const heat = L.heatLayer(addressPoints, {
      radius: 60,
      blur: 60,
      minOpacity: 0.75
    }).addTo(map);
  }
}
</script>

<style>
.basic-example {
  width: 100%;
  height: 500px;
}

#map-canvas {
  height: 350px;
}
</style>

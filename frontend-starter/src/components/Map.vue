<template>
  <div id="map-canvas" class="map" />
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
export default class Map extends Vue {
  
  private latlngs = [
    [39.334852, -76.509485, 1],
    [39.342596, -76.328731, 0.75],
    [39.342596, -76.329731, 1],
    [39.342596, -76.329731, 1],
    [39.342596, -76.329731, 1],
    [39.241487, -76.190568, 0.5],
    [39.234787, -76.358337, 1]
  ];

  constructor() {
    super();
  }
  // Mounted is called automatically when the component loads by Vue
  mounted() {
    this.setupCanvas();
  }

  setupCanvas() {
    const map = L.map("map-canvas").setView([39.334852, -76.509485], 12);

    const tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let addressPoints = 0 as any; //bad code

    // Ignore if you see a error here
    // addressPoints = require("./address_points.js").default;

    // addressPoints = addressPoints.map((p: any) => [p[0], p[1]]);

    addressPoints = this.latlngs.map((p: any) => [p[0], p[1]]);

    for (const point of addressPoints) {
      L.marker(point)
        .bindPopup("Some popup")
        .addTo(map);
    }

    const heat = L.heatLayer(addressPoints, {
      radius: 60,
      blur: 60,
      minOpacity: 0.75
    }).addTo(map);
  }
}
</script>

<style>
#map-canvas {
  width: 80%;
  height: 1200px;
  background-color: blue; /* TODO remove */
}
</style>

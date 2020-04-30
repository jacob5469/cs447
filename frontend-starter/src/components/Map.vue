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
  private map: L.Map | any = null;
  private mapData: any;

  constructor() {
    super();
  }

  // Mounted is called automatically when the component loads by Vue
  mounted() {
    this.resetMap();
  }

  resetMap() {
    let mapCenter = [39.2904, -76.6122];
    let mapZoom = 12;

    if (this.map) {
      mapCenter = this.map.getCenter();
      mapZoom = this.map.getZoom();
      this.map.remove();
    }
    this.map = L.map("map-canvas");
    this.map.setView(mapCenter, mapZoom);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  setMapData(mapData: any) {
    this.mapData = mapData;
    this.mapData = this.mapData.filter(el => (el.latitude && el.longitude));
  }

  addHeatmap() {
    const addressPoints = this.mapData.map(
      (p: any) => [p.latitude, p.longitude] as L.LatLngExpression
    );

    const heatLayer = L.heatLayer(addressPoints, {
      radius: 60,
      blur: 60,
      minOpacity: 0.6
    });

    heatLayer.addTo(this.map);
  }

  addMarkers() {
    for (const row of this.mapData) {
      const point: L.LatLngExpression = [
        Number(row.latitude),
        Number(row.longitude)
      ];
      L.marker(point)
        .bindPopup("" + row.description)
        .addTo(this.map);
    }
  }
}
</script>

<style>
#map-canvas {
  width: 80%;
  height: 1200px;
  /*background-color: blue;*/ /* TODO remove */
}
</style>

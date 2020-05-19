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
/**
 * Class for the map component of the frontend.
 */
export default class Map extends Vue {
  private map: L.Map | any = null;
  private mapData: any;

  constructor() {
    super();
  }

  /**
   * Automatically called function that resets the map once this component loads
   */
  mounted() {
    this.resetMap();
  }

  /**
   * Clears the map of all points and either places the map center at the center of baltimore and zoom at 12, or keeps the current zoom.
   */
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

  /**
   * Sets the point data to be held on the map component, points are not displayed until a heatmap or pinmap is added
   */
  setMapData(mapData: any) {
    this.mapData = mapData;
    this.mapData = this.mapData.filter(el => el.latitude && el.longitude);
  }

  /**
   * Uses the mapData points on the component to place a heatmap layer on the map
   */
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

  /**
   * Uses the mapData points on the component to place a pinmap/marker layer on the map
   */
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

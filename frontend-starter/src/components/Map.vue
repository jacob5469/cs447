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
  
  //TODO DUMMY DATA - REMOVE ONCE BACKEND IS AVAILABLE
  //CrimeID,crimedate,crimetime,crimecode,location,description,weapon,post,district,neighborhood,longitude,latitude,total_incidents
  private results = [
    [2633, "2020-02-29", "18:17:00", "3AF", "900 W 36TH ST", "ROBBERY - STREET", "FIREARM", 531, "NORTHERN", "HAMPDEN", -76.631533630000, 39.331220860000, 1],
    [2634, "2020-02-29", "15:04:00", "3AF", "1100 N BOND ST", "ROBBERY - STREET", "FIREARM", 323, "EASTERN", "GAY STREET", -76.596493790000, 39.303749600000, 1],
    [2635, "2020-02-29", "15:04:00", "3CF", "1100 N BOND ST", "ROBBERY - COMMERCIAL", "FIREARM", 323, "EASTERN", "GAY STREET", -76.596493790000, 39.303749600000, 1],
    [2636, "2020-02-29", "15:04:00", "3CF", "1100 N BOND ST", "ROBBERY - COMMERCIAL", "FIREARM", 323, "EASTERN", "GAY STREET", -76.596493790000, 39.303749600000, 1],
    [2637, "2020-02-29", "09:45:00", "4A", "1400 N DECKER AVE", "AGG. ASSAULT", "FIREARM", 332, "EASTERN", "BEREA", -76.574839640000, 39.307413900000, 1],
    [2638, "2020-02-29", "09:45:00", "4B", "900 SEAGULL AVE", "AGG. ASSAULT", "KNIFE", 922, "SOUTHERN", "CHERRY HILL", -76.622010960000, 39.244054240000, 1],
    [2639, "2020-02-29", "09:45:00", "4B", "900 SEAGULL AVE", "AGG. ASSAULT", "KNIFE", 922, "SOUTHERN", "CHERRY HILL", -76.622010960000, 39.244054240000, 1],
    [2640, "2020-02-29", "08:39:00", "4C", "5600 WALTHER AVE", "AGG. ASSAULT", "OTHER", 425, "NORTHEAST", "GLENHAM-BELFORD", -76.551651100000, 39.347581490000, 1],
    [2641, "2020-02-29", "13:00:00", "4D", "3000 CLIFTON PARK TER", "AGG. ASSAULT", "HANDS", 432, "NORTHEAST", "BELAIR-EDISON", -76.575126540000, 39.321321200000, 1],
    [2642, "2020-02-29", "03:44:00", "4E", "3900 BENZINGER RD", "COMMON ASSAULT", "NA", 832, "SOUTHWEST", "OAKLEE", -76.685355180000, 39.267919190000, 1],
    [2643, "2020-02-29", "14:20:00", "4E", "3400 CLIFTON AVE", "COMMON ASSAULT", "NA", 812, "SOUTHWEST", "MOUNT HOLLY",  -76.675580110000,  39.310843530000,1],
    [2644, "2020-02-29", "10:26:00", "4E", "1000 APPLETON ST", "COMMON ASSAULT", "NA", 722, "WESTERN", "MIDTOWN EDMONDSON",  -76.648417700000,  39.300290910000,1],
    [2645, "2020-02-29", "03:00:00", "4E", "1500 RUSSELL ST", "COMMON ASSAULT", "NA", 941, "SOUTHERN", "CARROLL - CAMDEN INDUSTRIAL AREA",  -76.627596000000,  39.274108080000,1],
    [2646, "2020-02-29", "16:54:00", "4E", "0 N CAROLINE ST", "COMMON ASSAULT", "NA", 212, "SOUTHEAST", "WASHINGTON HILL",  -76.597112560000,  39.291566940000,1],
    [2647, "2020-02-29", "15:52:00", "4E", "6100 MOYER AVE", "COMMON ASSAULT", "NA", 424, "NORTHEAST", "WESTFIELD",  -76.545700870000,  39.355198280000,1],
    [2648, "2020-02-29", "11:30:00", "5A", "4200 FAIRFAX RD", "BURGLARY", "NA", 624, "NORTHWEST", "WEST FOREST PARK",  -76.687736730000,  39.320353470000,1],
    [2649, "2020-02-29", "00:00:00", "5A", "3000 WALBROOK AVE", "BURGLARY", "NA", 811, "SOUTHWEST", "NORTHWEST COMMUNITY",  -76.668495020000,  39.310216620000,1],
    [2650, "2020-02-29", "14:00:00", "5A", "1900 W FAYETTE ST", "BURGLARY", "NA", 714, "WESTERN", "PENROSE/FAYETTE ST OUTREACH",  -76.647090750000,  39.289544860000,1],
    [2651, "2020-02-29", "07:35:00", "5A", "1500 FERNLEY RD", "BURGLARY", "NA", 412, "NORTHEAST", "EDNOR GARDENS-LAKESI",  -76.593035610000,  39.331905500000,1],
    [2652, "2020-02-29", "03:30:00", "5A", "2000 PORTUGAL ST", "BURGLARY", "NA", 212, "SOUTHEAST", "UPPER FELLS POINT",  -76.588536390000,  39.286281640000,1],
    [2653, "2020-02-29", "00:07:00", "5A", "700 N LUZERNE AVE", "BURGLARY", "NA", 333, "EASTERN", "MILTON-MONTFORD",  -76.580964550000,  39.299310200000,1],
    [2654, "2020-02-29", "16:00:00", "5B", "900 STAMFORD RD", "BURGLARY", "NA", 823, "SOUTHWEST", "WEST HILLS",  -76.709450090000,  39.295967970000,1],
    [2655, "2020-02-29", "15:00:00", "5D", "2700 WALBROOK AVE", "BURGLARY", "NA", 811, "SOUTHWEST", "WALBROOK",  -76.662373300000,  39.310262300000,1],
    [2656, "2020-02-29", "02:00:00", "5D", "2400 W BALTIMORE ST", "BURGLARY", "NA", 835, "SOUTHWEST", "PENROSE/FAYETTE ST OUTREACH",  -76.655467270000,  39.287857760000,1],
    [2657, "2020-02-29", "13:00:00", "6C", "5700 WABASH AVE", "LARCENY", "NA", 631, "NORTHWEST", "SETON BUSINESS PARK",  -76.698792650000,  39.347187210000,1]
  ];

  constructor() {
    super();
  }
  // Mounted is called automatically when the component loads by Vue
  mounted() {
    this.setupCanvas();
  }

  setupCanvas() {
    const map = L.map("map-canvas").setView([39.2904, -76.6122], 12);

    const tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let addressPoints = 0 as any; //bad code

    // Ignore if you see a error here
    // addressPoints = require("./address_points.js").default;

    // addressPoints = addressPoints.map((p: any) => [p[0], p[1]]);

    //Point columns in the database are backwards
    addressPoints = this.results.map((p: any) => [p[11], p[10]]);

    for (const crime of this.results) {
      const point: L.LatLngExpression = [Number(crime[11]), Number(crime[10])]; 
      L.marker(point)
        .bindPopup("" + crime[5])
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
  /*background-color: blue;*/ /* TODO remove */
}
</style>

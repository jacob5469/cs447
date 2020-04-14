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
  //crimeid,crimedate,crimetime,crimecode,location,description,inside_outside,weapon,post,district,neighborhood,longitude,latitude,premise,total_incidents
  private results = [
    [976, "2014-01-09", "11:00:00", "5B", "1300 EDISON HW", "BURGLARY", "I", "NA", 332, "EASTERN", "BEREA", -76.573040187414, 39.306521936022, "ROW/TOWNHOUSE-OCC", 1],
    [977, "2014-01-09", "11:08:00", "6J", "3100 PULASKI HW", "LARCENY", "I", "NA", 224, "SOUTHEAST", "ELLWOOD PARK/MONUMEN", -76.573469300969, 39.295405043275, "CONVENIENCE STORE", 1],
    [978, "2014-01-09", "11:10:00", "6C", "0 LIGHT ST", "LARCENY", "I", "NA", 111, "CENTRAL", "DOWNTOWN", -76.613593102650, 39.288018033503, "OTHER - INSIDE", 1],
    [979, "2014-01-09", "11:45:00", "6G", "6800 REISTERSTOWN RD", "LARCENY", "I", "NA", 631, "NORTHWEST", "FALLSTAFF", -76.707208185881, 39.360013292942, "DOCTORS OFFICE", 1],
    [980, "2014-01-09", "12:00:00", "5C", "3700 FAIRHAVEN AV", "BURGLARY", "I", "NA", 911, "SOUTHERN", "CURTIS BAY", -76.590614283356, 39.231221133573, "APT/CONDO - OCCUPIED", 1],
    [981, "2014-01-09", "12:00:00", "4E", "1100 COVINGTON ST", "COMMON ASSAULT", "I", "NA", 943, "SOUTHERN", "RIVERSIDE", -76.607062763743, 39.277513207167, "SCHOOL", 1],
    [982, "2014-01-09", "12:00:00", "5A", "1400 MCHENRY ST", "BURGLARY", "I", "NA", 935, "SOUTHERN", "NEW SOUTHWEST/MOUNT CLARE", -76.639839012144, 39.284420349908, "VACANT BUILDING", 1],
    [983, "2014-01-09", "12:12:00", "3AO", "1800 MOSHER ST", "ROBBERY - STREET", "O", "OTHER", 724, "WESTERN", "NULL", -76.645979258672, 39.299939873612, "STREET", 1],
    [984, "2014-01-09", "12:15:00", "6G", "300 S ANN ST", "LARCENY", "I", "NA", 212, "SOUTHEAST", "UPPER FELLS POINT", -76.591436614443, 39.287163385557, "ROW/TOWNHOUSE-OCC", 1],
    [985, "2014-01-09", "12:30:00", "5A", "2700 E OLIVER ST", "BURGLARY", "I", "NA", 332, "EASTERN", "BEREA", -76.579956871267, 39.308134446770, "VACANT BUILDING", 1],
    [986, "2014-01-09", "12:55:00", "5A", "6400 PARK HEIGHTS AV", "BURGLARY", "I", "NA", 632, "NORTHWEST", "GLEN", -76.697278988762, 39.360356781753, "APT/CONDO - OCCUPIED", 1],
    [987, "2014-01-09", "12:57:00", "4C", "200 MASON CT", "AGG. ASSAULT", "I", "OTHER", 211, "SOUTHEAST", "PERKINS HOMES", -76.595922671378, 39.287805017786, "ROW/TOWNHOUSE-OCC", 1],
    [988, "2014-01-09", "13:00:00", "5A", "2000 W NORTH AV", "BURGLARY", "I", "NA", 731, "WESTERN", "EASTERWOOD", -76.650374953028, 39.309569421876, "APT/CONDO - OCCUPIED", 1],
    [989, "2014-01-09", "13:00:00", "6D", "200 E 33RD ST", "LARCENY FROM AUTO", "O", "NA", 512, "NORTHERN", "CHARLES VILLAGE", -76.614827934673, 39.328348980357, "STREET", 1],
    [990, "2014-01-09", "13:00:00", "6C", "0 LIGHT ST", "LARCENY", "I", "NA", 111, "CENTRAL", "DOWNTOWN", -76.613593102650, 39.288018033503, "DRUG STORE / MED  BL", 1],
    [991, "2014-01-09", "13:20:00", "4D", "1400 DARLEY AV", "AGG. ASSAULT", "O", "HANDS", 312, "EASTERN", "DARLEY PARK", -76.596817467597, 39.315271823885, "STREET", 1],
    [992, "2014-01-09", "13:20:00", "4E", "900 W FAYETTE ST", "COMMON ASSAULT", "I", "NA", 712, "WESTERN", "POPPLETON", -76.632775627947, 39.290015974967, "APT/CONDO - OCCUPIED", 1],
    [993, "2014-01-09", "13:50:00", "6B", "200 S GILMOR ST", "LARCENY", "O", "NA", 933, "SOUTHERN", "NEW SOUTHWEST/MOUNT CLARE", -76.642258647047, 39.285317482712, "BUS/AUTO", 1],
    [994, "2014-01-09", "14:00:00", "4E", "1200 E MONUMENT ST", "COMMON ASSAULT", "O", "NA", 324, "EASTERN", "OLDTOWN", -76.601822691446, 39.298144709267, "STREET", 1],
    [995, "2014-01-09", "14:00:00", "5A", "5500 FRANKFORD AV", "BURGLARY", "I", "NA", 443, "NORTHEAST", "FRANKFORD", -76.540580032092, 39.322852713462, "OTHER/RESIDENTIAL", 1],
    [996, "2014-01-09", "14:00:00", "4E", "600 N CENTRAL AV", "COMMON ASSAULT", "I", "NA", 324, "EASTERN", "DUNBAR", -76.599971742789, 39.297682755485, "SCHOOL", 1],
    [997, "2014-01-09", "14:00:00", "5A", "3400 ORLANDO AV", "BURGLARY", "I", "NA", 424, "NORTHEAST", "WOODRING", -76.539503277502, 39.363577247447, "ROW/TOWNHOUSE-OCC", 1],
    [998, "2014-01-09", "14:00:00", "3B", "1900 N HOWARD ST", "ROBBERY - STREET", "O", "NA", 514, "NORTHERN", "CHARLES NORTH", -76.619356876741, 39.311143689531, "STREET", 1],
    [999, "2014-01-09", "14:30:00", "4E", "500 N CAROLINE ST", "COMMON ASSAULT", "I", "NA", 321, "EASTERN", "DUNBAR", -76.597539421733, 39.296552987590, "SCHOOL", 1],
    [1000, "2014-01-09", "14:32:00", "6C", "2500 W FRANKLIN ST", "LARCENY", "I", "NA", 721, "WESTERN", "ROSEMONT HOMEOWNERS", -76.658265901192, 39.293459311276, "OTHER - INSIDE", 1]
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
    addressPoints = this.results.map((p: any) => [p[12], p[11]]);

    for (const crime of this.results) {
      const point: L.LatLngExpression = [Number(crime[12]), Number(crime[11])]; 
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

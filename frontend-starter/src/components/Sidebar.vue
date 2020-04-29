<template>
  <div class="sidebar">
    <div>
      <div class="section-title">Global Filter Settings</div>
      <div>
        <div class="small-title">Time Frame</div> <!-- TODO add a dropdown for custom dates or all dates -->
        <div>
          <input type="date" text="Start"/>
        </div>
        <div>
          <input type="date" text="End" />
        </div>
      </div>
      <div>
        <div class="small-title">Descriptions</div> <!-- TODO -->
        <descriptions
          class="multi" 
          id="descriptions"
          v-model="selectedDescriptions"
          :multiple="true" 
          :options="descriptionOptions">
        </descriptions>
      </div>
      <div>
        <div class="small-title">Districts</div> <!-- TODO -->
        <districts
          class="multi" 
          id="districts"
          v-model="selectedDistricts"
          :multiple="true" 
          :options="districtOptions">
        </districts>
      </div>
      <div>
        <div class="small-title">Days</div> <!-- TODO -->
        <days
          class="multi" 
          id="days"
          v-model="selectedDays"
          :multiple="true" 
          :options="dayOptions">
        </days>
      </div>
      <div>
        <div class="small-title">Weapons</div> <!-- TODO -->
        <weapons
          class="multi"
          id="weapons" 
          v-model="selectedWeapons"
          :multiple="true" 
          :options="weaponOptions">
        </weapons>
      </div>
      <div>
        <div class="small-title">Indoor/Outdoor</div> <!-- TODO -->
        <inout
          class="multi" 
          id="inout"
          v-model="selectedInOut"
          :multiple="false" 
          :options="inOutOptions">
        </inout>
      </div>
    </div>
    <div class="btn-div">
      <v-btn id="submit" v-on:click="filter">Filter</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MultiSelect from 'vue-multiselect'

@Component({
  components: {
    descriptions: MultiSelect,
    districts: MultiSelect,
    days: MultiSelect,
    weapons: MultiSelect,
    inout: MultiSelect
  }
})
export default class Sidebar extends Vue {
  private selectedDescriptions = null;
  private selectedDistricts = null;
  private selectedDays = null;
  private selectedWeapons = null;
  private selectedInOut = null;

  //TODO fix these
  private descriptionOptions = ['All', 'AGG. ASSAULT', 'BURGLARY', 'COMMON ASSAULT', 'LARCENY', 'ROBBERY - STREET'];
  private districtOptions = ['All', 'EASTERN', 'NORTHEAST', 'NORTHERN', 'NORTHWEST', 'SOUTHEAST', 'SOUTHERN', 'SOUTHWEST', 'WESTERN'];
  private dayOptions = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private weaponOptions = ['All', 'FIREARM', 'HANDS', 'KNIFE', 'OTHER', 'NA'];
  private inOutOptions = ['All', 'Indoor', 'Outdoor'];

  filter() {
    const mockRequest = `{
      "crimedate": [
        "2014-01-14",
        "2020-04-04"
      ],
      "crimetime": [
        "13:00:00",
        "22:00:00"
      ],
      "descriptions": [
        "LARCENY",
        "BURGLARY"
      ],
      "inside": [
        "I"
      ],
      "districts": [
        "NORTHEAST",
        "WESTERN"
      ],
      "premises": [
        "ROW/TOWNHOUSE-VAC"
      ],
      "neighborhoods": [
        "FRANKLIN SQUARE",
        "FRANKFORD"
      ]
    }`;
    //console.log(mockRequest);
    this.$emit("APIData", mockRequest);
    // const json = JSON.stringify({
    //     // crimedate: null,
    //     // crimetime: null,
    //     // locations: null,
    //     descriptions: this.selectedDescriptions,
    //     inside: this.selectedInOut,
    //     districts: this.selectedDistricts,
    //     //premises: null,
    //     weapons: this.selectedWeapons
    //   })
  }

  mounted() {
    const mockRequest = `{
      "crimedate": [
        "2014-01-14",
        "2020-04-04"
      ],
      "crimetime": [
        "13:00:00",
        "22:00:00"
      ],
      "descriptions": [
        "LARCENY",
        "BURGLARY"
      ],
      "inside": [
        "I"
      ],
      "districts": [
        "NORTHEAST",
        "WESTERN"
      ],
      "premises": [
        "ROW/TOWNHOUSE-VAC"
      ],
      "neighborhoods": [
        "FRANKLIN SQUARE",
        "FRANKFORD"
      ]
    }`;
    this.$emit("APIData", mockRequest);
  }
}

</script>

<style scoped lang="scss">
.sidebar {
  width: 20%;
  top: 64px;
  background-color: #dddddd; //TODO change?
}

.section-title {
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
}

.small-title {
  /* font-size: 18px; */
  font-weight:bold;
}

.multi {
  border: black;
  border-width: 2px;
  //background-color: blue;
}

.btn-div {
  padding-top: 25px;
}
</style>

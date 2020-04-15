<template>
  <div class="sidebar">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MultiSelect from 'vue-multiselect'

export default {

  components: { 
    descriptions: MultiSelect,
    districts: MultiSelect,
    days: MultiSelect,
    weapons: MultiSelect,
    inout: MultiSelect
  },
  data () {
    return {
      selectedDescriptions: null,
      selectedDistricts: null,
      selectedDays: null,
      selectedWeapons: null,
      selectedInOut: null,

      //TODO fix these
      descriptionOptions: ['All', 'AGG. ASSAULT', 'BURGLARY', 'COMMON ASSAULT', 'LARCENY', 'ROBBERY - STREET'],
      districtOptions: ['All', 'EASTERN', 'NORTHEAST', 'NORTHERN', 'NORTHWEST', 'SOUTHEAST', 'SOUTHERN', 'SOUTHWEST', 'WESTERN'],
      dayOptions: ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weaponOptions: ['All', 'FIREARM', 'HANDS', 'KNIFE', 'OTHER', 'NA'],
      inOutOptions: ['All', 'Indoor', 'Outdoor']
    }
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
</style>

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
      <multiselect
        class="multi" 
        v-model="selected"
        :multiple="true" 
        :options="descriptionOptions">
      </multiselect>
    </div>
    <div>
      <div class="small-title">Districts</div> <!-- TODO -->
      <multiselect
        class="multi" 
        v-model="selected"
        :multiple="true" 
        :options="districtOptions">
      </multiselect>
    </div>
    <div>
      <div class="small-title">Days</div> <!-- TODO -->
      <multiselect
        class="multi" 
        v-model="selected"
        :multiple="true" 
        :options="dayOptions">
      </multiselect>
    </div>
    <div>
      <div class="small-title">Weapons</div> <!-- TODO -->
      <multiselect
        class="multi" 
        v-model="selected"
        :multiple="true" 
        :options="weaponOptions">
      </multiselect>
    </div>
    <div>
      <div class="small-title">Indoor/Outdoor</div> <!-- TODO -->
      <multiselect
        class="multi" 
        v-model="selected"
        :multiple="false" 
        :options="inOutOptions">
      </multiselect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MultiSelect from 'vue-multiselect'

export default {

  components: { Multiselect: MultiSelect },
  data () {
    return {
      selected: null,
      //TODO fix these
      descriptionOptions: ['All', 'Arson', 'Assault', 'Burglary'],
      districtOptions: ['All', '1', '2', '3'],
      dayOptions: ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weaponOptions: ['All', 'Gun', 'Knife', 'None'],
      inOutOptions: ['All', 'Indoor', 'Outdoor']
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  width: 20%;
  position: fixed;
  //right: 0px; //0px from right
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

<template>
  <div>
    <v-container>
      <div>
        <div class="section-title">Global Filter Settings</div>
        <br />

        <div v-if="monthPicker=='false'" >
        
        <div class="small-title">Time Frame</div>
        <br />
        <br />

        <v-date-picker
          title="Crime date range"
          no-title
          v-model="selectedDates"
          style="bottom: 40px;"
          range
        ></v-date-picker>

        <v-spacer />

        </div>

           <div v-if="monthPicker=='true'" >
        
        <div class="small-title">Time Frame</div>
        <br />
        <br />

        <v-date-picker
          title="Crime date range"
          type="month"
          value="new Date()"
          v-model="selectedMonth"
          no-title
          style="bottom: 40px;"
        ></v-date-picker>

        <v-spacer />

        </div>

        <div>
          <!-- <div class="small-title">Descriptions</div>  -->
          <v-combobox
            class="multi"
            v-model="selectedDescriptions"
            :items="descriptionOptions"
            multiple
            outlined
            chips
            label="Crime Description"
          ></v-combobox>
        </div>
        <div>
          <!-- <div class="small-title">Districts</div> -->
          <v-combobox
            class="multi"
            v-model="selectedDistricts"
            :items="districtOptions"
            multiple
            outlined
            chips
            label="Crime District"
          ></v-combobox>
        </div>
        <div>
          <!-- <div class="small-title">Days</div>  -->
          <v-combobox
            class="multi"
            v-model="selectedDays"
            :items="dayOptions"
            multiple
            outlined
            chips
            label="Days"
          ></v-combobox>
        </div>
        <div>
          <!-- <div class="small-title">Weapons</div>  -->
          <v-combobox
            class="multi"
            v-model="selectedWeapons"
            :items="weaponOptions"
            multiple
            outlined
            chips
            label="Crime Weapon"
          ></v-combobox>
        </div>
        <div>
          <!-- <div class="small-title">Indoor/Outdoor</div>  -->
          <v-combobox
            class="multi"
            v-model="selectedInOut"
            :items="inOutOptions"
            multiple
            outlined
            chips
            label="Indoor/Outdoor Crime"
          ></v-combobox>
        </div>
      </div>
      <div class="btn-div">
        <v-btn id="submit" v-on:click="filter">Filter</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MultiSelect from "vue-multiselect";

@Component({
  components: {
    MultiSelect,
    descriptions: MultiSelect,
    districts: MultiSelect,
    days: MultiSelect,
    weapons: MultiSelect,
    inout: MultiSelect
  }
})
export default class Sidebar extends Vue {
  private selectedDescriptions: string[] = [];
  private selectedDistricts: string[] = [];
  private selectedDays: string[] = [];
  private selectedDates: string[] = [];
  private selectedWeapons: string[] = [];
  private selectedInOut = "";
  private selectedMonth = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
  @Prop({default: false}) 
  monthPicker;

  //TODO fix these
  private descriptionOptions = [
    "All",
    "AGG. ASSAULT",
    "BURGLARY",
    "COMMON ASSAULT",
    "LARCENY",
    "ROBBERY - STREET"
  ];
  private districtOptions = [
    "All",
    "EASTERN",
    "NORTHEAST",
    "NORTHERN",
    "NORTHWEST",
    "SOUTHEAST",
    "SOUTHERN",
    "SOUTHWEST",
    "WESTERN"
  ];
  private dayOptions = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  private weaponOptions = ["All", "FIREARM", "HANDS", "KNIFE", "OTHER", "NA"];
  private inOutOptions = ["All", "Indoor", "Outdoor"];

  filter() {

    const request = {};

    if(this.selectedMonth && this.monthPicker == "true") {

      request["crimemonth"] = [this.selectedMonth];

    }

    if (this.selectedDates.length == 2 && this.monthPicker=="false") {
      request["crimedate"] = this.selectedDates;
    }

    if(this.selectedDays.length && !this.selectedDays.find(el => el === "All")) {

      const dayNumbers: number[] = [];

      for(const day of this.selectedDays) {

        dayNumbers.push(this.dayOptions.indexOf(day)-1);

      }

      request["crimedays"] = dayNumbers;

    }

    if (
      this.selectedDescriptions.length &&
      !this.selectedDescriptions.find(el => el === "All")
    ) {
      request["descriptions"] = this.selectedDescriptions;
    }

    if (
      this.selectedDistricts.length &&
      !this.selectedDistricts.find(el => el === "All")
    ) {
      request["districts"] = this.selectedDistricts;
    }

    if (
      this.selectedWeapons.length &&
      !this.selectedWeapons.find(el => el === "All")
    ) {
      request["weapons"] = this.selectedWeapons;
    }

    if (this.selectedInOut && this.selectedInOut != "All") {
      request["inside"] = this.selectedInOut === "Indoor" ? ["I"] : ["O"];
    }

    this.$emit("filterData", JSON.stringify(request));
  }

  mounted() {
    this.filter();
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 20%;
  top: 0px;
  background-color: #f0f0f0; //TODO change?
}

.section-title {
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
}

.small-title {
  /* font-size: 18px; */
  font-weight: bold;
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

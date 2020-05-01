<template>
  <div id="app">
    <GChart type="BarChart" @ready="example" style="width: 900px; height: 500px;" />
  </div>
</template>

<script lang="ts">
import { GChart } from "vue-google-charts";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    GChart
  }
})
export default class Graph extends Vue {
  async example(chart, google) {
      //does a get by default
      const data = await (
        await fetch("http://localhost:3000/api/graphs/weekday", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();

    // const data = [
    //     {
    //       "WEEKDAY(crimedate)": 2,
    //       "COUNT(*)": 43059
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 6,
    //       "COUNT(*)": 40315
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 1,
    //       "COUNT(*)": 43438
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 4,
    //       "COUNT(*)": 44807
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 0,
    //       "COUNT(*)": 44115
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 3,
    //       "COUNT(*)": 42677
    //     },
    //     {
    //       "WEEKDAY(crimedate)": 5,
    //       "COUNT(*)": 41654
    //     },
    // ];
    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const weekDay = data[i]['WEEKDAY(crimedate)'];
      const numberOfCrime = data[i]['COUNT(*)'];
      let day = "";
      if (weekDay === 0) {
        day = "Monday";
      } else if (weekDay === 1) {
        day = "Tuesday";
      } else if (weekDay === 2) {
        day = "Wednesday";
      } else if (weekDay === 3) {
        day = "Thursday";
      } else if (weekDay === 4) {
        day = "Friday";
      } else if (weekDay === 5) {
        day = "Saturday";
      } else if (weekDay === 6) {
        day = "Sunday";
      }
      map.set(day, numberOfCrime);
    }
    const options = {
      title: "Distribution of crime by weekdays",
      colors: ["DarkSlateBlue", "BlueViolet", "Crimson", "DarkCyan", "DeepPink", "ForestGreen", "DarkOrange"]
    };
    const chartData = [["ID"], [""]];
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
  }
}
</script>

<template>
  <div id="app">
    <GChart      
      type="BarChart"
      @ready = "onChartReady"
    />
    <GChart      
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
      style="width: 900px; height: 500px;"
    />
    <GChart      
      type="BubbleChart"
      :data="chartData2"
      :options="chartOptions2"
      style="width: 900px; height: 500px;"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "app",
  components: {
    GChart
  },
  data() {
    return {
      chartData: [
        ["ID", "Assault", "Knife", "Kidnapping"],
        ["", 80, 167, 120],
        ["", 79, 136, 130],
        ["", 78, 184, 50],
        ["", 72, 278, 230],
        ["", 81, 200, 210],
        ["", 72, 170, 100],
        ["", 68, 477, 80]
      ],
      chartOptions: {
        colorAxis: { colors: ["yellow", "red"] },
        title: 'Type of Crimes',
      },
      chartData2: [
        ["ID", "WoodBerry", "Downtown", "Inner Harbor"],
        ["", 80, 167, 120],
        ["", 79, 136, 130],
        ["", 78, 184, 50],
        ["", 72, 278, 230],
        ["", 81, 200, 210],
        ["", 72, 170, 100],
        ["", 68, 477, 80]
      ],
      chartOptions2: {
        title: "Area distribution",
        colorAxis: { colors: ["yellow", "red"] }
      }
    };
  },
  
  methods: {
     onChartReady(chart, google) {
      const query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1vDzr56Mxr9hv_eWmvwUW7ihPwnSNtkjJ32eDnFsK5Z8/edit?usp=sharing"
      );
      query.send(response => {
        const options = {
          title: "Age Distribution of Crime",
          colors: ["blue"]
        };
        const data = response.getDataTable();
        chart.draw(data, options);
      });
    },
  }
};
</script>

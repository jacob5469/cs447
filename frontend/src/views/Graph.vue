<template>
  <div id="graphs">
    <Loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" loader="bars" color="#007bff" height=128 width=128></Loading>
    <v-card-title primary-title class="justify-center">
      <GChart type="ColumnChart" @ready="weekDayDistribution" style="width: 1200px; height: 500px;" />
      <GChart type="ColumnChart" @ready="weaponDistribution" style="width: 1200px; height: 500px;" />
      <GChart type="ColumnChart" @ready="districtDistribution" style="width: 1200px; height: 500px;" />
      <GChart type="BarChart" @ready="descriptionDistribution" style="width: 1200px; height: 500px;" />
      <GChart type="AreaChart" @ready="crimeDateTrend" style="width: 1200px; height: 500px;" />
      <GChart type="AreaChart" @ready="crimeTimeTrend" style="width: 1200px; height: 500px;" />
    </v-card-title>
  </div>
</template>

<script lang="ts">
import { GChart } from "vue-google-charts";
import { Component, Vue } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

@Component({
  components: {
    GChart,
    Loading
  }
})
export default class Graph extends Vue {

  private chartsLoaded = 0;
  private isLoading = true;

  @Watch("chartsLoaded")
  onPropertyChanged(value:number, newValue:number) {

    if(this.chartsLoaded == 6) {

      this.isLoading = false;

    }

  }


  async weekDayDistribution(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/weekday", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();

    console.log(data);
   
    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      
      const weekDay = data.find(obj => obj["WEEKDAY(crimedate)"] == i)['WEEKDAY(crimedate)'];
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
      colors: ["Tomato", "DarkTurquoise"],
      hAxis : { 
        title: 'Weekdays',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      },
      vAxis : { 
        title: 'Number of cases',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      }
    };

    const chartData = [["ID"], [""]];
    const newChartData = await this.columnChartMaker(chartData, map);

    const table = new google.visualization.arrayToDataTable(newChartData);
    chart.draw(table, options);
    this.chartsLoaded += 1;

  };

  async weaponDistribution(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/weapon", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();
    
    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const weapon = data[i]['weapon'];
      const numberOfCrime = data[i]['COUNT(*)'];
      map.set(weapon, numberOfCrime);
    }
    const options = {
      title: "Distribution of crime by weapons",
      colors: ["RoyalBlue", "Plum"],
      hAxis : { 
        title: 'Weapons',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      },
      vAxis : { 
        title: 'Number of cases',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      }
    };
    
    const chartData = [["ID"], [""]];
    const newChartData = await this.columnChartMaker(chartData, map);

    const table = new google.visualization.arrayToDataTable(newChartData);
    chart.draw(table, options);
    this.chartsLoaded += 1;
  }

  async districtDistribution(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/district", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();

    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const district = data[i]['district'];
      const numberOfCrime = data[i]['COUNT(*)'];
      map.set(district, numberOfCrime);
    }
    const options = {
      title: "Distribution of crime by districts",
      colors: ["DarkOrange", "Gold"],
      hAxis : { 
        title: 'Districts',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      },
      vAxis : { 
        title: 'Number of cases',
        textStyle : {
            fontSize: 8 // or the number you want
        }
      }
    };
    
    const chartData = [["ID"], [""]];
    const newChartData = await this.columnChartMaker(chartData, map);

    const table = new google.visualization.arrayToDataTable(newChartData);
    chart.draw(table, options);
    this.chartsLoaded += 1;
  }

async descriptionDistribution(chart, google) {
      //does a get by default
  const data = await (
      await fetch("http://localhost:3000/api/graphs/description", {
        headers: { "Content-Type": "application/json" },
      })
  ).json();

  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const description = data[i]['description'];
    const numberOfCrime = data[i]['COUNT(*)'];
    map.set(description, numberOfCrime);
  }
  const options = {
    title: "Distribution of crime by description",
    colors: ["DeepSkyBlue", "LemonChiffon", "Aquamarine"],
    hAxis : { 
      title: 'Number of Cases',
      textStyle : {
          fontSize: 14 // or the number you want
      }
    },
    vAxis : { 
      title: 'Crime Description',
      textStyle : {
          fontSize: 8 // or the number you want
      }
    }
  };
  
  const chartData = [["ID"], [""]];
  const newChartData = await this.columnChartMaker(chartData, map);

  const table = new google.visualization.arrayToDataTable(newChartData);
  chart.draw(table, options);
  this.chartsLoaded += 1;
}

  async crimeDateTrend(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/date", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();

    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'].substr(0, 4);
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
    const options = {
      title: "Trend of crime over years",
      legend: 'none',
      colors: ["DeepSkyBlue"],
      hAxis : { 
        title: 'Year',
        textStyle : {
            fontSize: 14 // or the number you want
        }
      },
      vAxis : { 
        title: 'Number of Cases',
        textStyle : {
            fontSize: 14 // or the number you want
        }
      }
    };
    const chartData = [["Year", "Cases"]];
    const newChartData = await this.areaChartMaker(chartData, map);

    const table = new google.visualization.arrayToDataTable(newChartData);
    chart.draw(table, options);
    this.chartsLoaded += 1;
  }

async crimeTimeTrend(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/time", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();

    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeTime = parseInt(data[i]['crimetime'].substr(0, 2));
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeTime)) {
        const currentNumberOfCrime = map.get(crimeTime);
        map.set(crimeTime, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeTime, numberOfCrime);
      }
    }
    const options = {
      title: "Trend of crime over time of day",
      legend: 'none',
      colors: ["DarkOrchid"],
      hAxis : { 
        title: 'Time of The Day',
        textStyle : {
            fontSize: 14 // or the number you want
        }
      },
      vAxis : { 
        title: 'Number of Cases',
        textStyle : {
            fontSize: 14 // or the number you want
        }
      }
    };
    const sortKeys = (a, b) => a[0] > b[0] ? 1 : -1 
    const ar = [...map.entries()];
    const sortedArray = ar.sort(sortKeys);
    const sortedMap = new Map(sortedArray);
    const chartData = [["Time of The Day", "Cases"]];
    for (const [key, value] of sortedMap.entries()) {
      const recordInYears:any[] = []
      recordInYears.push(key + ':00');
      recordInYears.push(value);
      chartData.push(recordInYears);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
    this.chartsLoaded += 1;
  }

  async columnChartMaker(chartData, map) {
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    return chartData;
  }


  async areaChartMaker(chartData, map) {
    for (const [key, value] of map.entries()) {
      const record:any[] = []
      record.push(key);
      record.push(value);
      chartData.push(record);
    }
    return chartData;
  }

}
</script>

<style>
  .graphs {
    vertical-align : middle;
  }
</style>

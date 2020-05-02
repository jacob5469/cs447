<template>
  <div id="app">
    <GChart type="ColumnChart" @ready="weekDayDistribution" style="width: 900px; height: 500px;" />
    <GChart type="ColumnChart" @ready="weaponDistribution" style="width: 900px; height: 500px;" />
    <GChart type="ColumnChart" @ready="districtDistribution" style="width: 900px; height: 500px;" />
    <GChart type="BarChart" @ready="descriptionDistribution" style="width: 900px; height: 500px;" />
    <GChart type="AreaChart" @ready="crimeDateTrend" style="width: 900px; height: 500px;" />
    <GChart type="AreaChart" @ready="crimeTimeTrend" style="width: 900px; height: 500px;" />
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
  async weekDayDistribution(chart, google) {
      //does a get by default
    const data = await (
        await fetch("http://localhost:3000/api/graphs/weekday", {
          headers: { "Content-Type": "application/json" },
        })
    ).json();
   
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
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
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
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
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
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
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
  for (const [key, value] of map.entries()) {
    chartData[0].push(key);
    chartData[1].push(value);
  }
  const table = new google.visualization.arrayToDataTable(chartData);
  chart.draw(table, options);
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
    for (const [key, value] of map.entries()) {
      const recordInYears:any[] = []
      recordInYears.push(key);
      recordInYears.push(value);
      chartData.push(recordInYears);
    }
    const table = new google.visualization.arrayToDataTable(chartData);
    chart.draw(table, options);
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
  }

}
</script>

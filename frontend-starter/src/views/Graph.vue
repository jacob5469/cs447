<template>
  <div id="app">
    <GChart type="ColumnChart" @ready="weekDayDistribution" style="width: 900px; height: 500px;" />
    <GChart type="ColumnChart" @ready="weaponDistribution" style="width: 900px; height: 500px;" />
    <GChart type="ColumnChart" @ready="districtDistribution" style="width: 900px; height: 500px;" />
    <GChart type="BarChart" @ready="descriptionDistribution" style="width: 900px; height: 500px;" />
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
    // const data = await (
    //     await fetch("http://localhost:3000/api/graphs/weekday", {
    //       headers: { "Content-Type": "application/json" },
    //     })
    // ).json();
    const data = [
  {
    "WEEKDAY(crimedate)": 2,
    "COUNT(*)": 43059
  },
  {
    "WEEKDAY(crimedate)": 6,
    "COUNT(*)": 40315
  },
  {
    "WEEKDAY(crimedate)": 1,
    "COUNT(*)": 43438
  },
  {
    "WEEKDAY(crimedate)": 4,
    "COUNT(*)": 44807
  },
  {
    "WEEKDAY(crimedate)": 0,
    "COUNT(*)": 44115
  },
  {
    "WEEKDAY(crimedate)": 3,
    "COUNT(*)": 42677
  },
  {
    "WEEKDAY(crimedate)": 5,
    "COUNT(*)": 41654
  }
];
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
      //colors: ["RoyalBlue", "Plum", "Tomato", "DarkCyan", "Gold", "ForestGreen", "DarkOrange"]
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
    // const data = await (
    //     await fetch("http://localhost:3000/api/graphs/weapon", {
    //       headers: { "Content-Type": "application/json" },
    //     })
    // ).json();
    const data = [
  {
    "weapon": "OTHER",
    "COUNT(*)": 17784
  },
  {
    "weapon": "NA",
    "COUNT(*)": 236688
  },
  {
    "weapon": "KNIFE",
    "COUNT(*)": 10286
  },
  {
    "weapon": "HANDS",
    "COUNT(*)": 4016
  },
  {
    "weapon": "FIREARM",
    "COUNT(*)": 29992
  },
  {
    "weapon": "FIRE",
    "COUNT(*)": 1299
  }
];
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
    // const data = await (
    //     await fetch("http://localhost:3000/api/graphs/district", {
    //       headers: { "Content-Type": "application/json" },
    //     })
    // ).json();
    const data = [
  {
    "district": "NORTHWEST",
    "COUNT(*)": 29617
  },
  {
    "district": "NORTHERN",
    "COUNT(*)": 33215
  },
  {
    "district": "SOUTHWEST",
    "COUNT(*)": 30981
  },
  {
    "district": "NORTHEAST",
    "COUNT(*)": 44818
  },
  {
    "district": "CENTRAL",
    "COUNT(*)": 34672
  },
  {
    "district": "EASTERN",
    "COUNT(*)": 26103
  },
  {
    "district": "SOUTHERN",
    "COUNT(*)": 33638
  },
  {
    "district": "SOUTHEAST",
    "COUNT(*)": 42448
  },
  {
    "district": "WESTERN",
    "COUNT(*)": 23985
  },
  {
    "district": "UNKNOWN",
    "COUNT(*)": 588
  }
];

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
    // const data = await (
    //     await fetch("http://localhost:3000/api/graphs/description", {
    //       headers: { "Content-Type": "application/json" },
    //     })
    // ).json();
    const data = [
  {
    "description": "RAPE",
    "COUNT(*)": 1948
  },
  {
    "description": "BURGLARY",
    "COUNT(*)": 43050
  },
  {
    "description": "LARCENY",
    "COUNT(*)": 67064
  },
  {
    "description": "LARCENY FROM AUTO",
    "COUNT(*)": 39709
  },
  {
    "description": "AGG. ASSAULT",
    "COUNT(*)": 32698
  },
  {
    "description": "COMMON ASSAULT",
    "COUNT(*)": 49564
  },
  {
    "description": "AUTO THEFT",
    "COUNT(*)": 26435
  },
  {
    "description": "ROBBERY - STREET",
    "COUNT(*)": 21294
  },
  {
    "description": "ROBBERY - COMMERCIAL",
    "COUNT(*)": 5309
  },
  {
    "description": "ROBBERY - RESIDENCE",
    "COUNT(*)": 3119
  },
  {
    "description": "HOMICIDE",
    "COUNT(*)": 1955
  },
  {
    "description": "SHOOTING",
    "COUNT(*)": 3991
  },
  {
    "description": "ROBBERY - CARJACKING",
    "COUNT(*)": 2630
  },
  {
    "description": "ARSON",
    "COUNT(*)": 1299
  }

];

    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const description = data[i]['description'];
      const numberOfCrime = data[i]['COUNT(*)'];
      map.set(description, numberOfCrime);
    }
    console.log("asdasd");
    const options = {
      title: "Distribution of crime by description",
      legend: 'none',
      colors: ["DeepSkyBlue", "LemonChiffon", "Aquamarine"],
      hAxis : { 
        title: 'Number of Cases',
        textStyle : {
            fontSize: 8 // or the number you want
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


}
</script>

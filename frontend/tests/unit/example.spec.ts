import { columnChartMaker, areaChartMaker } from './ChartMaker';

test("Test column and bar chart maker when data is empty", async () => {
  const data = [];
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const district = data[i]['district'];
    const numberOfCrime = data[i]['COUNT(*)'];
    map.set(district, numberOfCrime);
  }
  const chartData = [["ID"], [""]];
  const newChartData = columnChartMaker(chartData, map);
  expect(newChartData[0].length).toBe(1);
  expect(newChartData[1].length).toBe(1);
});

test("Test column and bar chart maker when data key is invalid", async () => {
  const data = [];
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const district = data[i]['wrong_key'];
    const numberOfCrime = data[i]['wrong_key'];
    map.set(district, numberOfCrime);
  }
  const chartData = [["ID"], [""]];
  const newChartData = columnChartMaker(chartData, map);
  expect(newChartData[0].length).toBe(1);
  expect(newChartData[1].length).toBe(1);
});

test("Test column and bar chart maker when data is valid and there are five attributes", async () => {
  // should be able to see all five keys
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
    }
  ];
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const district = data[i]['district'];
    const numberOfCrime = data[i]['COUNT(*)'];
    map.set(district, numberOfCrime);
  }
  const chartData = [["ID"], [""]];
  const newChartData = columnChartMaker(chartData, map);
  expect(newChartData[0].length).toBe(6);
  expect(newChartData[1].length).toBe(6);
});

test("Test column and bar chart maker if the chart data is matching", async () => {
  // should be able to see the data matching
  const data = [
    {
      "district": "NORTHWEST",
      "COUNT(*)": 29617
    },
    {
      "district": "NORTHERN",
      "COUNT(*)": 33215
    },
  ];
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const district = data[i]['district'];
    const numberOfCrime = data[i]['COUNT(*)'];
    map.set(district, numberOfCrime);
  }
  const chartData = [["ID"], [""]];
  const newChartData = columnChartMaker(chartData, map);
  expect(newChartData[0][1]).toBe('NORTHWEST');
  expect(newChartData[1][1]).toBe(29617);
  expect(newChartData[0][2]).toBe('NORTHERN');
  expect(newChartData[1][2]).toBe(33215);
});

test("Test column and bar chart maker when data attribute is null", async () => {
  // should be able to see the data matching
  const data = [
    {
      "district": null,
      "COUNT(*)": null
    },
    {
      "district": null,
      "COUNT(*)": null
    },
  ];
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    const district = data[i]['district'];
    const numberOfCrime = data[i]['COUNT(*)'];
    map.set(district, numberOfCrime);
  }
  const chartData = [["ID"], [""]];
  const newChartData = columnChartMaker(chartData, map);
  expect(newChartData[0][1]).toBeNull;
  expect(newChartData[1][1]).toBeNull;
  expect(newChartData[0][2]).toBeNull;
  expect(newChartData[1][2]).toBeNull;
});

test("Test area chart maker if the chart data is empty", async () => {
  const data = [];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'];
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData.length).toBe(1);
});

test("Test area chart maker when data is valid and there are three attributes", async () => {
  //should be able to see data size of 4
  const data = [
    {
      "crimedate": "1963-10-30T05:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1969-07-20T04:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1975-06-01T04:00:00.000Z",
      "COUNT(*)": 1
    },
  ];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'];
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData.length).toBe(4);
});

test("Test area chart maker when data key is invalid", async () => {
  const data = [
    {
      "crimedate": "1963-10-30T05:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1969-07-20T04:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1975-06-01T04:00:00.000Z",
      "COUNT(*)": 1
    },
  ];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['wrong_key'];
      const numberOfCrime = data[i]['wrong_key'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        if (crimeDate !== undefined && numberOfCrime !== undefined) {
          map.set(crimeDate, numberOfCrime);
        }
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData.length).toBe(1);
});

test("Test area chart maker when data attribute is null", async () => {
  const data = [
    {
      "crimedate": null,
      "COUNT(*)": null
    },
  ];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'];
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData[1][0]).toBeNull;
  expect(newChartData[1][1]).toBeNull;
});


test("Test area chart maker if data is matching", async () => {
  const data = [
    {
      "crimedate": "1963-10-30T05:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1969-07-20T04:00:00.000Z",
      "COUNT(*)": 2
    },
    {
      "crimedate": "1975-06-01T04:00:00.000Z",
      "COUNT(*)": 3
    },
  ];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'].substr(0,4);
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData[1][0]).toBe("1963");
  expect(newChartData[1][1]).toBe(1);
  expect(newChartData[2][0]).toBe("1969");
  expect(newChartData[2][1]).toBe(2);
  expect(newChartData[3][0]).toBe("1975");
  expect(newChartData[3][1]).toBe(3);
});

test("Test area chart maker if data is stacking", async () => {
  const data = [
    {
      "crimedate": "1963-10-30T05:00:00.000Z",
      "COUNT(*)": 1
    },
    {
      "crimedate": "1963-07-20T04:00:00.000Z",
      "COUNT(*)": 2
    },
    {
      "crimedate": "1963-06-01T04:00:00.000Z",
      "COUNT(*)": 3
    },
  ];
  const map = new Map();
    for (let i = 0; i < data.length; i++) {
      const crimeDate = data[i]['crimedate'].substr(0,4);
      const numberOfCrime = data[i]['COUNT(*)'];
      if (map.has(crimeDate)) {
        const currentNumberOfCrime = map.get(crimeDate);
        map.set(crimeDate, currentNumberOfCrime + numberOfCrime);
      } else {  
        map.set(crimeDate, numberOfCrime);
      }
    }
  const chartData = [["Year", "Cases"]];
  const newChartData = areaChartMaker(chartData, map);
  expect(newChartData[1][0]).toBe("1963");
  expect(newChartData[1][1]).toBe(6);
});

export const columnChartMaker = (chartData: any[][], map: Map<any, any>) => {
    for (const [key, value] of map.entries()) {
      chartData[0].push(key);
      chartData[1].push(value);
    }
    return chartData;
}

export const areaChartMaker = (chartData: any[][], map: Map<any, any>) => {
  for (const [key, value] of map.entries()) {
    const record:any[] = []
    record.push(key);
    record.push(value);
    chartData.push(record);
  }
  return chartData;
}
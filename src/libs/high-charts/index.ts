import { scatterSeries } from "src/types";

export const ScatterChart = (flow: string, series: scatterSeries) =>  {  
  return {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: `${flow.length  ? flow : 'Incomes and expenses' }`,
      align: 'left',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%Y-%m'
      },
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: `${flow.length  ? flow : 'Incomes and expenses' }`,
      },
      labels: {
        format: '$ {value}',
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 2.5,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        jitter: {
          x: 0.005,
        },
      },
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      pointFormat: 'Date: {point.x:%Y-%m-%d}, Amount: {point.y}'
  },
    series,
  }
};
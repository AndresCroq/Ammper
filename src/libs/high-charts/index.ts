import { Line, ScatterSeries } from "src/types";

export const lineChart = (averages: Line[]) => {  
  return {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Mean, Median, and Mode'
      },
      xAxis: {
          categories: averages.map(({date}) => new Date(date).toLocaleDateString())
      },
      yAxis: {
          title: {
              text: 'Values'
          }
      },
      series: [{
          name: 'Mean',
          data: averages.map((e) => e.mean),
          marker: {
              symbol: 'circle',
              radius: 6
          }
      }, {
          name: 'Median',
          data: averages.map((e) => e.median),
          marker: {
              symbol: 'diamond',
              radius: 6
          }
      }, {
          name: 'Mode',
          data: averages.map((e) => e.mode),
          marker: {
              symbol: 'square',
              radius: 6
          }
      }]
  }
}

export const scatterChart = (flow: string, series: ScatterSeries) =>  {  
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
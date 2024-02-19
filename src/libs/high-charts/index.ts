import { Line, ScatterSeries } from "src/types";
import { formatDateFromNumber } from "src/utils/date-formats";

export const lineChart = (averages: Line[]) => {  
  return {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Media, mediana y moda de gastos'
      },
      xAxis: {
          categories: averages.map(({date}) => formatDateFromNumber(date))
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
      text: `${flow.length  ? flow : 'Gastos e ingresos' }`,
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
        text: `${flow.length  ? flow : 'Gastos e ingresos' }`,
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
      pointFormat: 'Fecha: {point.x:%Y-%m-%d}, Cantidad: {point.y}'
  },
    series,
  }
};
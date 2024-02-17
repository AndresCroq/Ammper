export interface Bar {
  chart: Chart
  title: Title
  xAxis: XAxis
  yAxis: YAxis
  legend: Legend
  plotOptions: PlotOptions
  series: SeriesElement[]
}
export interface Chart {
  type: string
}
export interface Legend {
  reversed: boolean
}
export interface PlotOptions {
  series: PlotOptionsSeries
}
export interface PlotOptionsSeries {
  stacking: string
  dataLabels: DataLabels
}
export interface DataLabels {
  enabled: boolean
}
export interface SeriesElement {
  name: string
  data: number[]
}
export interface Title {
  text: string
}
export interface XAxis {
  categories: string[]
}
export interface YAxis {
  min: number
  title: Title
}

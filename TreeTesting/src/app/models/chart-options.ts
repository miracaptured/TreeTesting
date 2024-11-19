import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexChart,
    ApexLegend,
    ApexPlotOptions
  } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries | number[];
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    colors: string[];
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
    labels: string[];
    grid: any;
    fill: any;
};

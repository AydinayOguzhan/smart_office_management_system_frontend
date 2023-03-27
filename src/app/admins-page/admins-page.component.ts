import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexTheme
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss']
})
export class AdminsPageComponent implements OnInit {
  chart1Options: Partial<ChartOptions> | any;
  chart2Options: Partial<ChartOptions> | any;
  chart3Options: Partial<ChartOptions> | any;
  chart4Options: Partial<ChartOptions> | any;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(1);
    this.chart1Options = this.data("line");
    this.chart2Options = this.data("bar");
    this.chart3Options = this.data("area");
    this.chart4Options = this.radarChart();
  }


  data(type: string) {
    return {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: type,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    }
  }

  radarChart() {
    return {
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      chart: {
        height: 350,
        type: "radar"
      },
      title: {
        text: "Basic Radar Chart"
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"]
      }
    }
  }
}

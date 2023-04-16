import { formatDate } from '@angular/common';
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
  ApexTheme,
} from "ng-apexcharts";
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/constants/messages';
import { Urls } from 'src/constants/urls';
import { ReadingDeviceModel } from 'src/models/readings/readingDeviceModel';
import { ReadingTemperatureModel } from 'src/models/readings/readingTemperatureModel';
import { ReadingsService } from 'src/services/readings/readings.service';
import { MotionDeviceModel } from 'src/models/motionSensors/motionDeviceModel';
import { MotionsService } from 'src/services/motions/motions.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions:ApexPlotOptions;
};

export interface deneme {
  x: string,
  y: number
}

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss']
})
export class AdminsPageComponent implements OnInit {
  temperatureChartOptions: Partial<ChartOptions> | any;
  humidityChartOptions: Partial<ChartOptions> | any;
  motionSensorStatisticsChart: Partial<ChartOptions> | any;
  chart4Options: Partial<ChartOptions> | any;

  devices: ReadingDeviceModel[];

  deviceId: number = 10;
  temperatures:any = new Array();
  temperatureDates:any = new Array();
  isTemperatureData:Promise<boolean>;

  humidityDeviceId: number = 10;
  humidities:any = new Array();
  humidityDates:any = new Array();
  isHumiditiesData:Promise<boolean>;

  motionDevices:MotionDeviceModel[];
  motionDeviceId:number = 1;
  motionSensorStatisticDeviceIds:any = new Array();
  motionSensorStatisticCounts:any = new Array();



  constructor(private navbarService: NavbarService, private readingsService: ReadingsService,
    private toastrService: ToastrService, private motionService:MotionsService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(1);

    this.getDevices();
    this.readingTemperaturesByDeviceId();
    this.readingHumiditiesByDeviceId();
    this.getAllMotionSensorStatistics();

    this.temperatureChartOptions = this.temperatureData("line");
    this.humidityChartOptions = this.humidityData("line");
    this.motionSensorStatisticsChart = this.motionSensorStatisticsRadarChartData();

    // this.chart3Options = this.data("area");

  }

  getDevices() {
    this.readingsService.getDevices().subscribe((response) => {
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else this.devices = response.data;
    });
  }

  readingTemperaturesByDeviceId() {
    this.readingsService.getTemperaturesByDeviceId(this.deviceId).subscribe((response) => {
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else {
        this.temperatureDates.splice(0);
        this.temperatures.splice(0);
        response.data.forEach((element) => {
          this.temperatures.push(element.temperature);
          this.temperatureDates.push(element.timestamp);
        })
        this.isTemperatureData = Promise.resolve(true);
      }
    });
  }

  readingHumiditiesByDeviceId() {
    this.readingsService.getHumiditiesByDeviceId(this.humidityDeviceId).subscribe((response) => {
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else {
        this.humidities.splice(0);
        this.humidityDates.splice(0);
        response.data.forEach((element) => {
          this.humidities.push(element.humidity);
          this.humidityDates.push(element.timestamp);
        })
        this.isHumiditiesData = Promise.resolve(true);
      }
    });
  }

  getAllMotionSensorStatistics(){
    this.motionService.getAllMotionSensorStatistic().subscribe((response)=>{
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else{
        console.log(response)
        this.motionSensorStatisticDeviceIds.splice(0);
        this.motionSensorStatisticCounts.splice(0);
        response.data.forEach((element)=>{
          this.motionSensorStatisticDeviceIds.push(element._id);
          this.motionSensorStatisticCounts.push(element.count);
        })
      }
    });
  }

  readingsDeviceChange(value: string) {
    this.deviceId = Number(value);
    this.readingTemperaturesByDeviceId();
  }

  readingHumidityDeviceChange(value: string) {
    this.humidityDeviceId = Number(value);
    this.readingHumiditiesByDeviceId();
  }

  temperatureData(type: string) {
    return {
      series: [
        {
          name: "Ölçümler",
          data: this.temperatures
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
        text: "Cihazın Ölçtüğü Sıcaklık Değerleri",
        align: "left"
      },
      xaxis: {
        // type:"datetime",
        categories: this.temperatureDates
      }
    }
  }

  humidityData(type: string) {
    return {
      series: [
        {
          name: "Ölçümler",
          data: this.humidities
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
        text: "Cihazın Ölçtüğü Nem Değerleri",
        align: "left"
      },
      xaxis: {
        // type:"datetime",
        categories: this.humidityDates
      }
    }
  }

  motionSensorStatisticsRadarChartData() {
    return {
      series: [
        {
          name: "Toplam adet",
          data: this.motionSensorStatisticCounts
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions:{
        bar:{
          horizontal:true
        }
      },
      title: {
        text: "Cihazların algıladığı toplam hareket sayıları"
      },
      xaxis: {
        categories: this.motionSensorStatisticDeviceIds
      }
    }
  }
}

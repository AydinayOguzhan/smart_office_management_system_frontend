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
import { MotionModel } from 'src/models/motionSensors/motionModel';

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

  motionDeviceId:number = 1;
  motionSensorStatisticDeviceIds:any = new Array();
  motionSensorStatisticCounts:any = new Array();
  isMotionSensorStatisticsData:Promise<boolean>;

  isMotionDevicesData:Promise<boolean>;
  isAllMotionsData:Promise<boolean>;
  motionDevices:MotionDeviceModel[];
  allMotions:MotionModel[];
  defaultAllMotions:MotionModel[];
  isSearchSwitch:boolean = false;

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
    this.motionSensorStatisticsChart = this.motionSensorStatisticsRadarChartData("bar");

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
        this.motionSensorStatisticDeviceIds.splice(0);
        this.motionSensorStatisticCounts.splice(0);
        response.data.forEach((element)=>{
          this.motionSensorStatisticDeviceIds.push(element.device_name);
          this.motionSensorStatisticCounts.push(element.count);
        });
        this.isMotionSensorStatisticsData = Promise.resolve(true);
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

  getAllMotionDevices(){
    this.motionService.getMotionDevices().subscribe((response)=>{
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else{
        this.motionDevices = response.data;
        this.isMotionDevicesData = Promise.resolve(true);
      }
    });
  }

  getAllMotionsById(deviceId:string){
    this.motionService.getAllMotionsByDeviceId(Number(deviceId)).subscribe((response)=>{
      if (response.success === false) this.toastrService.error(Messages.somethingWentWrong);
      else{
        this.allMotions = response.data;
        this.defaultAllMotions = response.data;
        this.isAllMotionsData = Promise.resolve(true);
      }
    });
  }

  showMotionDetails(){
    this.getAllMotionDevices();
  }

  motionDeviceChange(deviceId:string){
    this.getAllMotionsById(deviceId);
  }

  motionSearchByDate(date:string){
    if (date !== "") {
      let baseDate = new Date(date);
      this.allMotions = this.allMotions.filter((element)=>{
        let eDate = new Date(element.timestamp);
        return eDate.getTime() >= baseDate.getTime();
      });
    }else{
      this.toastrService.error("Lütfen bir tarih seçiniz");
    }
  }

  motionSearchByDateRange(startDate:string, endDate:string){
    if (startDate !== "" || endDate !== "") {
      let baseStartDate = new Date(startDate);
      let baseEndDate = new Date(endDate);
      this.allMotions = this.allMotions.filter((element)=>{
        let eDate = new Date(element.timestamp);
        return eDate.getTime() >= baseStartDate.getTime() && eDate.getTime() <= baseEndDate.getTime();
      })
    }else{
      this.toastrService.error("Lütfen tarihleri seçiniz");
    }
  }

  resetAllMotions(){
    this.allMotions = this.defaultAllMotions;
  }

  changeIsSearchInput(checked:boolean){
    this.isSearchSwitch = checked;
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

  motionSensorStatisticsRadarChartData(type:string) {
    return {
      series: [
        {
          name: "Toplam adet",
          data: this.motionSensorStatisticCounts
        }
      ],
      chart: {
        height: 350,
        type: type
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

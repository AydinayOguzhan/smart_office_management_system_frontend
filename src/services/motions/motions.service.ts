import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from 'src/constants/urls';
import { ListResponseModel } from 'src/models/listResponseModel';
import { MotionDeviceModel } from 'src/models/motionSensors/motionDeviceModel';
import { MotionModel } from 'src/models/motionSensors/motionModel';
import { MotionSensorStatisticModel } from 'src/models/motionSensors/motionSensorStatisticModel';

@Injectable({
  providedIn: 'root'
})
export class MotionsService {

  baseUrl = Urls.prodApiUrl + Urls.motions;

  constructor(private httpClient:HttpClient) { }

  getMotionDevices():Observable<ListResponseModel<MotionDeviceModel>>{
    let url = this.baseUrl + Urls.getMotionDevices;
    return this.httpClient.get<ListResponseModel<MotionDeviceModel>>(url);
  }

  getAllMotions():Observable<ListResponseModel<MotionModel>>{
    let url = this.baseUrl + Urls.getAllMotions;
    return this.httpClient.get<ListResponseModel<MotionModel>>(url);
  }

  getAllMotionsByDeviceId(deviceId:number):Observable<ListResponseModel<MotionModel>>{
    let url = this.baseUrl + Urls.getAllMotionsByDevice + `/${deviceId}`;
    return this.httpClient.get<ListResponseModel<MotionModel>>(url);
  }

  getAllMotionSensorStatistic():Observable<ListResponseModel<MotionSensorStatisticModel>>{
    let url = this.baseUrl + Urls.getAllMotionSensorStatistics;
    return this.httpClient.get<ListResponseModel<MotionSensorStatisticModel>>(url);
  }
}

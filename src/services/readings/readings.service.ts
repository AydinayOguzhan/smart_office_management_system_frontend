import { Urls } from 'src/constants/urls';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/models/listResponseModel';
import { ReadingDeviceModel } from 'src/models/readings/readingDeviceModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadingTemperatureModel } from 'src/models/readings/readingTemperatureModel';
import { ReadingHumidityModel } from 'src/models/readings/readingHumidityModel';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  baseUrl:string = Urls.prodApiUrl + Urls.readings;

  constructor(private httpClient:HttpClient) { }

  getDevices():Observable<ListResponseModel<ReadingDeviceModel>>{
    let url = this.baseUrl + Urls.getDevices;
    return this.httpClient.get<ListResponseModel<ReadingDeviceModel>>(url);
  }

  getTemperaturesByDeviceId(deviceId:number):Observable<ListResponseModel<ReadingTemperatureModel>>{
    let url = this.baseUrl + Urls.getTemperaturesByDevice + `/${deviceId}`;
    return this.httpClient.get<ListResponseModel<ReadingTemperatureModel>>(url);
  }

  getHumiditiesByDeviceId(deviceId:number):Observable<ListResponseModel<ReadingHumidityModel>>{
    let url = this.baseUrl + Urls.getHumiditiesByDevice + `/${deviceId}`;
    return this.httpClient.get<ListResponseModel<ReadingHumidityModel>>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from 'src/constants/urls';
import { ListResponseModel } from 'src/models/listResponseModel';
import { RecordModel } from 'src/models/record/recordModel';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<RecordModel>>{
    let url = Urls.prodApiUrl + Urls.records + Urls.getAllRecords;
    return this.httpClient.get<ListResponseModel<RecordModel>>(url);
  }

  getAllDateRange(startDate:string, endDate:string):Observable<ListResponseModel<RecordModel>>{
    let url = Urls.prodApiUrl + Urls.records + Urls.getAllRecordsDateRange + `/${startDate}/${endDate}`;
    return this.httpClient.get<ListResponseModel<RecordModel>>(url);
  }
}

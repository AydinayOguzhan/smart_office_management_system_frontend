import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from 'src/constants/urls';
import { ListResponseModel } from 'src/models/listResponseModel';
import { NotificationSettingModel } from 'src/models/notifications/notificationSettingModel';
import { ResponseModel } from 'src/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }


  getUserNotificationSettingsByEmail(email:string):Observable<ListResponseModel<NotificationSettingModel>>{
    let url = Urls.prodApiUrl + Urls.userNotifications + Urls.getAllDetailsByEmail + `/${email}`;
    return this.httpClient.get<ListResponseModel<NotificationSettingModel>>(url);
  }

  update(notificationSettingModel:NotificationSettingModel):Observable<ResponseModel>{
    let url = Urls.prodApiUrl + Urls.userNotifications + Urls.updateUserNotificationOptions;
    return this.httpClient.put<ResponseModel>(url, notificationSettingModel);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/models/login/loginModel';
import { SingleResponseModel } from 'src/models/singleResponseModel';
import { TokenModel } from 'src/models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'src/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urls = new Urls;

  constructor(private httpClient:HttpClient) { }

  //TODO: Backend ayarlandıktan sonra burası token model dönmeli
  login(loginModel:LoginModel):Observable<SingleResponseModel<string>>{
    let url = this.urls.prodApiUrl + this.urls.auth + this.urls.login;
    return this.httpClient.post<SingleResponseModel<string>>(url,loginModel);
  }

  logout(){
    localStorage.clear();
    window.location.replace("/");
  }
}

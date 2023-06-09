import { ForgotPasswordModel } from './../../models/changePassword/forgotPasswordModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/models/login/loginModel';
import { SingleResponseModel } from 'src/models/singleResponseModel';
import { TokenModel } from 'src/models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'src/constants/urls';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/models/responseModel';
import { CheckCodeModel } from 'src/models/changePassword/checkCodeModel';
import { ChangePasswordModel } from 'src/models/changePassword/changePasswordModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let url = Urls.prodApiUrl + Urls.auth + Urls.login;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url,loginModel);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

  forgotPassword(forgotPasswordModel:ForgotPasswordModel):Observable<ResponseModel>{
    let url = Urls.prodApiUrl + Urls.auth + Urls.forgotPassword;
    return this.httpClient.post<ResponseModel>(url, forgotPasswordModel);
  }

  checkCode(checkCodeModel:CheckCodeModel):Observable<ResponseModel>{
    let url = Urls.prodApiUrl + Urls.auth + Urls.checkCode;
    return this.httpClient.post<ResponseModel>(url, checkCodeModel);
  }

  changePassword(changePasswordModel:ChangePasswordModel): Observable<ResponseModel>{
    let url = Urls.prodApiUrl + Urls.auth + Urls.changePassword;
    return this.httpClient.post<ResponseModel>(url, changePasswordModel);
  }
}

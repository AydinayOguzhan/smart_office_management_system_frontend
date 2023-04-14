import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Messages } from 'src/constants/messages';
import { LoginService } from 'src/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router, private loginService:LoginService, private toastrService:ToastrService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (this.loginService.isAuthenticated()) {
        return true;
      }else{
        this.router.navigate(["/"]);
        this.toastrService.error(Messages.pleaseLogin);
        return true;
      }

  }

}

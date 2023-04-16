import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from "@angular/forms";
import { LoginService } from 'src/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm:UntypedFormGroup;

  constructor(private formBuilder:UntypedFormBuilder, private toastrService:ToastrService, private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    });
  }

  login(){
    if (this.loginForm.valid) {
      let user = Object.assign({},this.loginForm.value);
      this.loginService.login(user).subscribe((response)=>{
        if(response.success === true){
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("expirationDate", response.data.expirationDate);
          window.localStorage.setItem("email", user.email);
          this.toastrService.success("İşlem başarılı","",{timeOut:500}).onHidden.subscribe(()=>{this.router.navigate(["admin-panel"])});
        }else{
          this.toastrService.error(response.message);
        }
      })
    }else{
      this.toastrService.error("Lütfen boş alan bırakmayınız");
    }
  }
}

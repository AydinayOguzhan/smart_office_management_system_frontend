import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService) { }

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
    // window.location.replace("/admin-panel");
    if (this.loginForm.valid) {
      let user = Object.assign({},this.loginForm.value);
      console.log(user);
    }else{
      this.toastrService.error("Lütfen boş alan bırakmayınız");
      console.log("Please fill the empty spaces");
    }
  }
}

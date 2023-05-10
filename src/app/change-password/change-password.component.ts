import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/constants/messages';
import { ChangePasswordModel } from 'src/models/changePassword/changePasswordModel';
import { CheckCodeModel } from 'src/models/changePassword/checkCodeModel';
import { ForgotPasswordModel } from 'src/models/changePassword/forgotPasswordModel';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  isEmail:boolean = false;
  isCheckedCode:boolean = false;

  userEmail:string;

  sendCodeForm:FormGroup;
  checkCodeForm:FormGroup;
  changePasswordForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private loginService:LoginService,
    private router:Router){}

  ngOnInit(): void {
    this.createSendCodeForm();
  }

  createSendCodeForm(){
    this.sendCodeForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  createCheckForm(){
    this.checkCodeForm = this.formBuilder.group({
      code: ["", Validators.required],
    });
  }

  createChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
      passwordAgain: ["", Validators.required],
    });
  }


  sendCode(){
    if (this.sendCodeForm.valid) {
      let forgotPasswordObj = Object.assign({},this.sendCodeForm.value);
      this.forgotPassword(forgotPasswordObj);
    }else{
      this.toastrService.error(Messages.pleaseFillTheBlanks);
    }
  }

  forgotPassword(forgotPasswordModel:ForgotPasswordModel){
    this.loginService.forgotPassword(forgotPasswordModel).subscribe((response)=>{
      if (response.success === false) {
        this.toastrService.error(response.message);
      }else{
        this.toastrService.success(response.message);
        this.createCheckForm();
        this.userEmail = forgotPasswordModel.email;
        this.isEmail = true;
      }
    });
  }


  check(){
    if (this.checkCodeForm.valid) {
      let checkCodeObj = Object.assign({}, this.checkCodeForm.value);
      checkCodeObj.email = this.userEmail;
      this.checkCode(checkCodeObj);
    }else{
      this.toastrService.error(Messages.pleaseFillTheBlanks)
    }
  }

  checkCode(checkCodeModel:CheckCodeModel){
    this.loginService.checkCode(checkCodeModel).subscribe((response)=>{
      if (response.success === false) {
        this.toastrService.error(response.message);
      }else{
        this.toastrService.success(response.message);
        this.createChangePasswordForm();
        this.isCheckedCode = true;
      }
    });
  }


  change(){
    if (this.changePasswordForm.valid) {
      let changePasswordObj = Object.assign({}, this.changePasswordForm.value);
      changePasswordObj.email = this.userEmail;
      this.changePassword(changePasswordObj);
    }else{
      this.toastrService.error(Messages.pleaseFillTheBlanks);
    }
  }

  changePassword(changePasswordModel:ChangePasswordModel){
    this.loginService.changePassword(changePasswordModel).subscribe((response)=>{
      if (response.success === false) {
        this.toastrService.error(response.message);
      }else{
        this.toastrService.success("İşlem başarılı","", {timeOut:500}).onHidden.subscribe(()=>{this.router.navigate([""])});
      }
    });
  }
}

import { RecordsComponent } from './records/records.component';
import { LiveStreamComponent } from './live-stream/live-stream.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/guards/login/login.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:"", component:LoginPageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"change-password", component:ChangePasswordComponent},
  {path:"admin-panel", component:AdminsPageComponent, canActivate:[LoginGuard]},
  {path:"live-stream", component:LiveStreamComponent, canActivate:[LoginGuard]},
  {path:"records", component:RecordsComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

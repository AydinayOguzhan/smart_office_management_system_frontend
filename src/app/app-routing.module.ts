import { RecordsComponent } from './records/records.component';
import { LiveStreamComponent } from './live-stream/live-stream.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:LoginPageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"admin-panel", component:AdminsPageComponent},
  {path:"live-stream", component:LiveStreamComponent},
  {path:"records", component:RecordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

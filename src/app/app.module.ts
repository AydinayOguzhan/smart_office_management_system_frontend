import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LiveStreamComponent } from './live-stream/live-stream.component';
import { RecordsComponent } from './records/records.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from 'src/interceptors/auth/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MenuNotificationComponent } from './menu-notification/menu-notification.component';
import { CardNotificationComponent } from './card-notification/card-notification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminsPageComponent,
    LoginPageComponent,
    NavbarComponent,
    LiveStreamComponent,
    RecordsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    MenuNotificationComponent,
    CardNotificationComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

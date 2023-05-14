import { LoginService } from 'src/services/login/login.service';
import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';
import { MenuNotificationComponent } from '../menu-notification/menu-notification.component';
import { NotificationModel } from 'src/models/notifications/notificationModel';
import { WebsocketService } from 'src/services/websocket/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/services/notifications/notification.service';
import { NotificationSettingModel } from 'src/models/notifications/notificationSettingModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active:number = 0;
  notifications:NotificationModel[] = new Array();

  userNotificationSettings:NotificationSettingModel[];
  isUserNotificationSettingsData:boolean = false;


  constructor(private navbarService:NavbarService, private loginService:LoginService, private websocketService:WebsocketService,
    private toastrService:ToastrService, private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.active = this.navbarService.readActive();
    this.notifications = this.navbarService.readNotifications();

    this.websocketService.connect().subscribe((response)=>{
      this.notifications = this.navbarService.readNotifications();
      this.notifications.push(response);
      window.localStorage.setItem("notifications", JSON.stringify(this.notifications));
      this.toastrService.warning("Yeni bir hareket algılandı");
    });
  }

  logout(){
    this.loginService.logout();
  }

  deleteItem(value:number){
    setTimeout(()=>{
      this.notifications.splice(value, 1);
      window.localStorage.setItem("notifications", JSON.stringify(this.notifications));
    },1000);
  }

  getAllNotificationSettingsByEmail(){
    let email = window.localStorage.getItem("email");
    this.notificationService.getUserNotificationSettingsByEmail(email!).subscribe((response)=>{
      if (response.success === true) {
        this.userNotificationSettings = response.data;
        this.isUserNotificationSettingsData = true;
        console.log(response.data)
      }else{
        this.toastrService.error(response.message);
      }
    });
  }

  updateUserNotificationOptions(){
    this.userNotificationSettings.forEach((element, index)=>{
      this.notificationService.update(element).subscribe((response)=>{
        if(response.success === false) this.toastrService.error(response.message);
        else {
          //Don't show the success message until the foreach cycle hits the last index of the array
          if(index === this.userNotificationSettings.length - 1) this.toastrService.success(response.message);
        }
      });
    });
  }
}

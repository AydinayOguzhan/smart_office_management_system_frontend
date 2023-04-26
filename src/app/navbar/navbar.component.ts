import { LoginService } from 'src/services/login/login.service';
import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';
import { MenuNotificationComponent } from '../menu-notification/menu-notification.component';
import { NotificationModel } from 'src/models/notifications/notificationModel';
import { WebsocketService } from 'src/services/websocket/websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active:number = 0;
  notifications:NotificationModel[] = new Array();

  constructor(private navbarService:NavbarService, private loginService:LoginService, private websocketService:WebsocketService,
    private toastrService:ToastrService) { }

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

}

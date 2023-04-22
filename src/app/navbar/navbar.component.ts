import { LoginService } from 'src/services/login/login.service';
import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';
import { MenuNotificationComponent } from '../menu-notification/menu-notification.component';
import { NotificationModel } from 'src/models/notifications/notificationModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  active:number = 0;
  notifications:any[];


  notificationsMockup:NotificationModel[] = [{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},]

  constructor(private navbarService:NavbarService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.active = this.navbarService.readActive();
    this.notifications = this.navbarService.notifications;
  }

  logout(){
    this.loginService.logout();
  }


}

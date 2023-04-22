import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from 'src/models/notifications/notificationModel';
import { CardNotificationComponent } from '../card-notification/card-notification.component';

@Component({
  selector: 'app-menu-notification',
  standalone: true,
  imports: [CommonModule, CardNotificationComponent],
  templateUrl: './menu-notification.component.html',
  styleUrls: ['./menu-notification.component.scss']
})
export class MenuNotificationComponent {
  notificationsMockup:NotificationModel[] = [{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},{device_id:1, device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},]


}

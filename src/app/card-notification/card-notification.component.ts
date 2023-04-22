import { NotificationModel } from './../../models/notifications/notificationModel';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.scss']
})
export class CardNotificationComponent {
  @Input() notification:NotificationModel
  @Input() notificationId:number


  deleteNotification(){
    console.log(this.notificationId);
  }
}

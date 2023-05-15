import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from 'src/models/notifications/notificationModel';

@Component({
  selector: 'app-humidity-card-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './humidity-card-notification.component.html',
  styleUrls: ['./humidity-card-notification.component.scss']
})
export class HumidityCardNotificationComponent {
  @Input() notification:NotificationModel
  @Input() notificationId:number

  isDelete:boolean = false;

  @Output() deleteItemCardOutput = new EventEmitter<number>();
  deleteItemCard(value: number) {
    this.deleteItemCardOutput.emit(value);
    this.isDelete = true;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from 'src/models/notifications/notificationModel';

@Component({
  selector: 'app-temperature-card-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperature-card-notification.component.html',
  styleUrls: ['./temperature-card-notification.component.scss']
})
export class TemperatureCardNotificationComponent {
  @Input() notification:NotificationModel
  @Input() notificationId:number

  isDelete:boolean = false;

  @Output() deleteItemCardOutput = new EventEmitter<number>();
  deleteItemCard(value: number) {
    this.deleteItemCardOutput.emit(value);
    this.isDelete = true;
  }
}

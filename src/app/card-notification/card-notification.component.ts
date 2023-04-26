import { NavbarService } from './../../services/navbar/navbar.service';
import { NotificationModel } from './../../models/notifications/notificationModel';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.scss']
})
export class CardNotificationComponent implements OnInit{
  @Input() notification:NotificationModel
  @Input() notificationId:number

  isDelete:boolean = false;

  @Output() deleteItemCardOutput = new EventEmitter<number>();
  deleteItemCard(value: number) {
    this.deleteItemCardOutput.emit(value);
    this.isDelete = true;
  }

  someSubscription: any;

  constructor(private navbarService:NavbarService){}

  ngOnInit(): void {

  }
}

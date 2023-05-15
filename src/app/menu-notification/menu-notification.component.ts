import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModel } from 'src/models/notifications/notificationModel';
import { CardNotificationComponent } from '../card-notification/card-notification.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TemperatureCardNotificationComponent } from "../temperature-card-notification/temperature-card-notification.component";
import { HumidityCardNotificationComponent } from "../humidity-card-notification/humidity-card-notification.component";


@Component({
    selector: 'app-menu-notification',
    standalone: true,
    templateUrl: './menu-notification.component.html',
    styleUrls: ['./menu-notification.component.scss'],
    imports: [CommonModule, CardNotificationComponent, TemperatureCardNotificationComponent, HumidityCardNotificationComponent]
})
export class MenuNotificationComponent implements OnInit{
  @Input() notifications:NotificationModel[]

  @Output() deleteItemMenuOutput = new EventEmitter<number>();
  deleteItemMenu(value: number) {
    this.deleteItemMenuOutput.emit(value);
  }

  constructor(){

  }

  ngOnInit(){

  }

}


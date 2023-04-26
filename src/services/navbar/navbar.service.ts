import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  active:number = 1;
  constructor() { }

  changeActive(active:number){
    this.active = active;
  }

  readActive(){
    return this.active;
  }

  readNotifications(){
    if (window.localStorage.getItem("notifications")) {
      let notificationItems = window.localStorage.getItem("notifications");
      return notificationItems ? JSON.parse(notificationItems) : [];
    }else{
      return [];
    }
  }
}

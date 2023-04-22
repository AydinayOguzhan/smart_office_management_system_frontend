import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  active:number = 1;

  notifications:any[] = [{device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"}, {device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"}, {device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"},
  {device_name:"Smart office sensor 1", timestamp:"2023-04-15 21:19:18"}]

  // notifications:any[] = [];

  constructor() { }

  changeActive(active:number){
    this.active = active;
  }

  readActive(){
    return this.active;
  }
}

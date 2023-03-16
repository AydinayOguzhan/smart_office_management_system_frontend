import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  active:number = 0;

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.active = this.navbarService.readActive();
  }

}

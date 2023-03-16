import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss']
})
export class AdminsPageComponent implements OnInit {

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(1);
  }


}

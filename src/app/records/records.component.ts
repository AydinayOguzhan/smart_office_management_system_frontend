import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(3);
  }

}

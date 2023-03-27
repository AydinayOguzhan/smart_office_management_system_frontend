import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit {

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(2);
  }

}

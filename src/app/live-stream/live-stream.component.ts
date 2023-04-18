import { NavbarService } from './../../services/navbar/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit {
  videoSrc: string = '';

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeActive(2);

    const ws = new WebSocket(`ws://192.168.1.43:5001`);

    ws.onmessage = (event) =>{
      if (this.videoSrc === '') {
        const blob = new Blob([event.data], {type: 'video/mp4'});
        this.videoSrc = URL.createObjectURL(blob);
        console.log(this.videoSrc)
      }
    }
  }

}

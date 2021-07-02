import { Component } from '@angular/core';
import { MusicService } from './service/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(public music: MusicService){
  }
}

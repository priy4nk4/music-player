import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {
  @ViewChild('myname') input: any; 
  constructor() { }

  ngOnInit(): void {
  }
  CreatePlaylist(){
    
    console.log('playlist crreated', this.input.nativeElement.value);
  }

}

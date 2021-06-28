import { Component, ViewChild } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private modalService: NgbModal, private cdref: ChangeDetectorRef){
  }
  title = 'music-player';
  @ViewChild('player', { static: false })
  msaapTableHeader! :string;
  msaapTitleHeader!:string;
  msaapArtistHeader!: string;

  blues: Track[] = [
    {
      title: 'bensound',
      link: 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3',
      duration: 185,
      artist: 'The Kyoto'
    },
    {
      title: 'bensound',
      link: 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3',
      duration: 185,
      artist: 'The Kyoto'
    }
  ];

  currentTrack: any = null;
  currentTime: any;
  appendTracksToPlaylistDisable = false;
  counter = 1;
  ngAfterContentChecked() {
    this.msaapTableHeader = 'My Playlist';
    this.msaapTitleHeader = 'My Title';
    this.msaapArtistHeader = 'My Artist';
    this.cdref.detectChanges();
  }

  onEnded(event: any) {
    console.log(event);
    this.currentTrack = null;
  }
  updatePlayList(){
    this.modalService.open(PlaylistModalComponent);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { MusicService } from './service/music.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private modalService: NgbModal, private cdref: ChangeDetectorRef, private music: MusicService){
  }
  title = 'music-player';
  @ViewChild('player', { static: false })
  msaapTableHeader! :string;
  msaapTitleHeader!:string;
  msaapArtistHeader!: string;

  playList!: Track[];
  currentTrack: any = null;
  currentTime: any;
  // appendTracksToPlaylistDisable = false;
  counter = 1;
  ngOnInit() {
    this.music.getMusiclist().subscribe((response: Track[]) => {
      this.playList = response;
    });
    this.currentTrack = this.playList;
  }

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
  playSong(index: number){
    this.currentTrack = this.playList.slice(index);
  }
  updatePlayList(){
    this.modalService.open(PlaylistModalComponent);
  }
}

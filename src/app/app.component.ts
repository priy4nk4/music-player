import { Component, OnInit, ViewChild } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { MusicService } from './service/music.service';
import { playlist } from './model/playlist.model';

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
  isAutoplayOn: boolean = false;
  isCustomListExpanded: boolean = false;
  allPlaylist!: string[];
  allMusicList!: Track[];
  currentTrack: any = null;
  allCustomPlaylist: playlist[] = [];
  currentPlayList!:  Track[];

  currentTime: any;



  // appendTracksToPlaylistDisable = false;
  counter = 1;
  ngOnInit() {
    this.music.getMusiclist().subscribe((response: Track[]) => {
      this.allMusicList = response;
    });
    this.currentTrack = this.allMusicList;
    this.currentPlayList = [...new Set(this.allMusicList)];

  }

  ngAfterContentChecked() {
    this.msaapTableHeader = 'My Playlist';
    this.msaapTitleHeader = 'My Title';
    this.msaapArtistHeader = 'My Artist';
    this.cdref.detectChanges();
  }

  onEnded(event: any) {
    this.currentTrack = null;
  }
  goHome(){
    this.isAutoplayOn = false;
    this.isCustomListExpanded = false;
    this.currentPlayList = this.allMusicList;
    this.currentTrack = this.allMusicList;
  }
  playSong(index: number){
    this.isAutoplayOn = true;
    this.currentTrack = this.allMusicList.slice(index);
  }
  addToPlayList(song:Track){
    const modalRef = this.modalService.open(PlaylistModalComponent);
    modalRef.componentInstance.songObj = song;
    modalRef.componentInstance.clickevent.subscribe((event: any) => {
      this.allCustomPlaylist = this.music.all_custom_playlist;
    })
  }

  removeFromPlayList(song:Track) {
    let removedIndex = this.currentPlayList.findIndex(ele=> ele.title == song.title)
    this.currentPlayList.splice(removedIndex, 1);
    // this.isCustomListExpanded = true;
  }
  gotoPlaylist(customPlaylist: playlist){
    this.isCustomListExpanded = true;
    this.isAutoplayOn = false;
    this.currentPlayList = customPlaylist.playlist;
    this.currentTrack = customPlaylist.playlist;
  }
}

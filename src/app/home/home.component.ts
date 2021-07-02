import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { playlist } from '../model/playlist.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from '../playlist-modal/playlist-modal.component';
import { MusicService } from '../service/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentPlayList: playlist[] = [];
  isCustomListExpanded!: boolean;
  allPlaylist!: string[];
  allMusicList!: playlist[];
  currentTrack!: any;
  constructor(private modalService: NgbModal, public music: MusicService) { 
    this.music.currentPlayList.subscribe(ele=> this.currentPlayList = ele);
    this.music.isCustomListExpanded.subscribe(res => this.isCustomListExpanded = res);
  }

  ngOnInit(): void {
    this.music.getMusiclist().subscribe((response: playlist[]) => {
      this.allMusicList = response;
    });

    this.currentPlayList =[...new Set(this.allMusicList)];
    this.music.currentPlayList.next(this.currentPlayList);
  }
  playSong(index: number){
    this.music.isAutoplayOn = true;
    this.currentTrack = this.currentPlayList[0].Tracks.slice(index);
    this.music.currentTrack.next(this.currentTrack);
  }
  
  addToPlayList(song:Track){
    const modalRef = this.modalService.open(PlaylistModalComponent);
    modalRef.componentInstance.songObj = song;
  }

  removeFromPlayList(song:Track ,title: string) {
    let removedIndex = this.currentPlayList[0].Tracks.findIndex(ele=> ele.title == song.title)
    this.currentPlayList[0].Tracks.splice(removedIndex, 1);
    this.music.currentPlayList.next(this.currentPlayList);
    this.music.isCustomListExpanded.next(true);
    if(this.currentPlayList[0].Tracks.length <=0) {
      let index = this.music.all_custom_playlist.findIndex(ele => ele.title == title);
      this.music.all_custom_playlist.splice(index, 1);
      this.music.currentPlayList.next(this.music.allMusicList);
      this.music.playlistTitle= 'My Music';
    }
  }
}

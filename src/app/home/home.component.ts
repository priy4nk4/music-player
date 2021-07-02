import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { playlist } from '../model/playlist.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from '../playlist-modal/playlist-modal.component';
import { MusicService } from '../service/music.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentPlayList: playlist[] = [];
  isAutoplayOn: boolean = false;
  isCustomListExpanded!: boolean;
  allPlaylist!: string[];
  allMusicList!: playlist[];
  currentTrack!: any;
  // allCustomPlaylist: playlist[] = [];
  constructor(private modalService: NgbModal, private music: MusicService) { 
     this.music.currentPlayList.subscribe(ele=> this.currentPlayList = ele);

    console.log(this.currentPlayList);
    // this.currentPlayList = this.music.currentPlayList;
     this.music.isCustomListExpanded.subscribe(res => this.isCustomListExpanded = res)
  }

  ngOnInit(): void {
    console.log(this.currentPlayList);
    this.music.getMusiclist().subscribe((response: playlist[]) => {
      this.allMusicList = response;
    });
    
    let x = this.allMusicList.map(ele => ele.Tracks);
    console.log(x);
    // this.currentTrack = this.allMusicList;
    this.currentPlayList =[...new Set(this.allMusicList)];
    this.music.currentPlayList.next(this.currentPlayList);

    // this.music.currentPlayList = this.currentPlayList;
    console.log(this.music.currentPlayList);
    console.log(this.currentPlayList);
  }
  playSong(index: number){
    this.isAutoplayOn = true;
    this.currentTrack = this.currentPlayList[0].Tracks.slice(index);
    console.log(this.music)

    // this.music.currentTrack = this.currentTrack;
    this.music.currentTrack.next(this.currentTrack);

    this.music.isCardClicked = true;
    console.log(this.music)


    // this.currentTrack = this.allMusicList.slice(index);
  }
  
  addToPlayList(song:Track){
    const modalRef = this.modalService.open(PlaylistModalComponent);
    modalRef.componentInstance.songObj = song;
    modalRef.componentInstance.clickevent.subscribe((event: any) => {
      // this.music.all_custom_playlist.next(event);
    })
  }

  removeFromPlayList(song:Track ,title: string) {
    let removedIndex = this.currentPlayList[0].Tracks.findIndex(ele=> ele.title == song.title)
    this.currentPlayList[0].Tracks.splice(removedIndex, 1);
    this.music.currentPlayList.next(this.currentPlayList);
    // this.music.currentPlayList=this.currentPlayList;
    // this.isCustomListExpanded = true;
    this.music.isCustomListExpanded.next(true);
    if(this.currentPlayList[0].Tracks.length <=0) {
      let index = this.music.all_custom_playlist.findIndex(ele => ele.title == title);
      this.music.all_custom_playlist.splice(index, 1);
      this.music.isCardClicked = false;
    }
  }
}

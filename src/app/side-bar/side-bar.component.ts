import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { playlist } from '../model/playlist.model';
import { MusicService } from '../service/music.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  isAutoplayOn: boolean = false;
  currentTrack: any = null;
  $allCustomPlaylist!: Observable< playlist[]>;
  allCustomPlaylist!:playlist[];

  constructor(private music: MusicService) {
    // this.$allCustomPlaylist = this.music.all_custom_playlist;
    // this.music.all_custom_playlist.subscribe(ele => this.allCustomPlaylist = ele);
    this.allCustomPlaylist = this.music.all_custom_playlist  }

  ngOnInit(): void {
    console.log(this.allCustomPlaylist)
  }
  goToHome(){
    this.isAutoplayOn = false;
    this.music.isCustomListExpanded.next(false);
    this.music.currentPlayList.next(this.music.allMusicList);
    this.music.playlistTitle= 'My Music';

    // this.music.currentPlayList = this.music.allMusicList;
    // this.currentPlayList = this.allMusicList;
    // this.music.currentTrack.next(this.music.allMusicList);
    // this.currentTrack = this.music.allMusicList;
  }
  // playSong(index: number){
  //   this.isAutoplayOn = true;

  //   this.currentTrack = this.music.currentPlayList.slice(index);
  // }
  gotoPlaylist(customPlaylist: playlist){
    // this.isCustomListExpanded = true;
    this.music.playlistTitle= customPlaylist.title;
    this.isAutoplayOn = false;
    // this.currentPlayList = customPlaylist.playlist;
    // this.music.currentTrack.next(customPlaylist.Tracks);
    this.music.currentPlayList.next([customPlaylist])
    // this.music.currentPlayList = [customPlaylist]
    this.music.isCustomListExpanded.next(true);
    this.music.currentTrack.next(customPlaylist.Tracks)
    // this.currentTrack = customPlaylist.Tracks;
  }
}

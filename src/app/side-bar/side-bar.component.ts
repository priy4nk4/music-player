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
  $allCustomPlaylist!: Observable< playlist[]>;
  allCustomPlaylist!:playlist[];

  constructor(private music: MusicService) {
    this.allCustomPlaylist = this.music.all_custom_playlist  
  }

  ngOnInit(): void {
  }
  goToHome(){
    this.music.isAutoplayOn = false;
    this.music.isCustomListExpanded.next(false);
    this.music.currentPlayList.next(this.music.allMusicList);
    this.music.playlistTitle= 'My Music';
  }
  gotoPlaylist(customPlaylist: playlist){
    this.music.playlistTitle= customPlaylist.title;
    this.music.isAutoplayOn = false;
    this.music.currentPlayList.next([customPlaylist])
    this.music.isCustomListExpanded.next(true);
    this.music.currentTrack.next(customPlaylist.Tracks)
  }
}

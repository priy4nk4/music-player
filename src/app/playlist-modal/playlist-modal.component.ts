import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'ngx-audio-player'; 
import { MusicService } from '../service/music.service';
import { playlist } from '../model/playlist.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {
  @Input() songObj!: Track;
  custom_playlist!: playlist[];
  isNewPlaylistClicked: boolean = false;
  topContentTitle!: string;
  myTitle!: string;
  btnDisable: boolean = true;

  constructor(private music : MusicService, public activeModal: NgbActiveModal) {
    this.custom_playlist = this.music.all_custom_playlist;
  }

  ngOnInit(): void {
    this.topContentTitle = "Add to Playlist";
    
  }
  expandPlaylist(){
    this.isNewPlaylistClicked = true;
    this.topContentTitle = "New Playlist";
  }

  createPlaylist(){
    let obj : playlist = {title: '', Tracks: []};
    obj.title = this.myTitle;
    obj.Tracks = [this.songObj];
   
    if(this.custom_playlist.length == 0) {
      this.music.all_custom_playlist.push(obj); 
    } else {
      let titles = this.custom_playlist.map(ele=> ele.title);
      if(!titles.includes(obj.title))this.music.all_custom_playlist.push(obj); 
    }
 
    this.isNewPlaylistClicked = false;
    this.activeModal.dismiss();
  }

  addToPlaylist(song: playlist) {
    for(let i of this.custom_playlist){
      let index = i.Tracks.findIndex(ele => ele.title == this.songObj.title);
      if(index < 0){
        if(i.title == song.title){
          i.Tracks.push(this.songObj);
        } 
      }
    }
    this.music.all_custom_playlist = this.custom_playlist; 
    this.activeModal.dismiss();
  }
  modelChangeFn(event: string){
    let value = event.trim();
    if(value.length > 0) this.btnDisable = false;
    else{
      this.btnDisable = true;
    }

  }
  cancelPlaylist() {
    this.activeModal.dismiss();
  }

}

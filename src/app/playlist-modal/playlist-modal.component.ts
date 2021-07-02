import { ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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
  // @ViewChild('myname') input!: ElementRef; 
  @Input() songObj!: Track;
  @Output() clickevent = new EventEmitter<any>();
  custom_playlist!: playlist[];
  isNewPlaylistClicked: boolean = false;

  constructor(private music : MusicService, public activeModal: NgbActiveModal) {
    this.custom_playlist = this.music.all_custom_playlist;
   }

  ngOnInit(): void {

    
  }
  expandPlaylist(){
    this.isNewPlaylistClicked = true;
  }

  createPlaylist(myname: any){
    let obj : playlist = {title: '', Tracks: []};
    obj.title = myname.value;
    obj.Tracks = [this.songObj];
    if(this.custom_playlist.length == 0) {
      this.music.all_custom_playlist.push(obj); 
      this.clickevent.emit(this.custom_playlist);
      // this.custom_playlist.push(obj)
    }
    else {
      for(let i of this.custom_playlist){
        if (i.title != obj.title){
          this.music.all_custom_playlist.push(obj); 
          this.clickevent.emit(this.custom_playlist);
          // this.custom_playlist.push(obj)
        }
      }
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
    // this.music.all_custom_playlist.next(this.custom_playlist); 
    this.music.all_custom_playlist = this.custom_playlist; 
    this.clickevent.emit(this.custom_playlist);
    this.activeModal.dismiss();
  }

}

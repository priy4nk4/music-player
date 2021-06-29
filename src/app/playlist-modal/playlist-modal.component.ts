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
  @ViewChild('myname') input!: ElementRef; 
  @Input() songObj!: Track;
  @Output() clickevent = new EventEmitter<string>();
  custom_playlist: playlist[] = [];
  isNewPlaylistClicked: boolean = false;

  constructor(private music : MusicService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.custom_playlist = this.music.all_custom_playlist;
  }
  expandPlaylist(){
    this.isNewPlaylistClicked = true;
  }

  CreatePlaylist(){
    let obj : playlist = {title: '', playlist: []};
    obj.title = this.input.nativeElement.value;
    obj.playlist = [this.songObj];
    this.music.all_custom_playlist.push(obj); 
    this.clickevent.emit('true');
    this.isNewPlaylistClicked = false;
    this.activeModal.dismiss();
  }

  addToPlaylist(song: any) {
    for(let i of this.custom_playlist){
      if(i.title == song.title){
        i.playlist.push(this.songObj);
      }
    }
    this.clickevent.emit('true');
    this.activeModal.dismiss();
  }

}

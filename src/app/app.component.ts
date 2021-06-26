import { Component, ViewChild } from '@angular/core';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'music-player';
  @ViewChild('player', { static: false })
  pageSizeOptions = [2, 4, 6];

  msaapTableHeader = 'My Playlist';
  msaapTitleHeader = 'My Title';
  msaapArtistHeader = 'My Artist';
  msaapDurationHeader = 'My Duration';

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
  
  onEnded(event: any) {
    console.log(event);
    this.currentTrack = null;
  }
}

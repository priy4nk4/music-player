import { Injectable } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { playlist } from '../model/playlist.model';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() { }
  all_custom_playlist : playlist[] = [];
  public isCardClicked: boolean = true;
  // public isCardClicked = new Subject<boolean>();

  isAutoplayOn: boolean = false;
  isCustomListExpanded = new Subject<boolean>();
  allPlaylist!: string[];
  // allMusicList!: Track[];
  public currentTrack = new Subject<Track[]>();
  // public currentTrack!: Track[];
  // currentTrack: any = null;
  // all_custom_playlist = new Subject<playlist[]>();
  currentPlayList = new Subject<playlist[]>();
  // currentPlayList!: playlist[];
  allMusicList: playlist[] = [{
    title: 'Home',
    Tracks:   [
      {
        title: 'Better Days',
        link: 'https://www.bensound.com/bensound-music/bensound-betterdays.mp3',
        image: 'https://www.bensound.com/bensound-img/betterdays.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Sunny',
        link: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        image: 'https://www.bensound.com/bensound-img/sunny.jpg',
        duration: 185,
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Energy',
        link: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
        image: 'https://www.bensound.com/bensound-img/energy.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Tenderness',
        link: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        image: 'https://www.bensound.com/bensound-img/tenderness.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Tomorrow',
        link: 'https://www.bensound.com/bensound-music/bensound-tomorrow.mp3',
        image: 'https://www.bensound.com/bensound-img/tomorrow.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Slow Motion',
        link: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
        image: 'https://www.bensound.com/bensound-img/slowmotion.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Evolution',
        link: 'https://www.bensound.com/bensound-music/bensound-evolution.mp3',
        image: 'https://www.bensound.com/bensound-img/evolution.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Sweet',
        link: 'https://www.bensound.com/bensound-music/bensound-sweet.mp3',
        image: 'https://www.bensound.com/bensound-img/sweet.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Inspire',
        link: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3',
        image: 'https://www.bensound.com/bensound-img/inspire.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Piano Moment',
        link: 'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3',
        image: 'https://www.bensound.com/bensound-img/pianomoment.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Dance',
        link: 'https://www.bensound.com/bensound-music/bensound-dance.mp3',
        image: 'https://www.bensound.com/bensound-img/dance.jpg',
        artist: 'Benjamin Tissot'
      },
      {
        title: 'Love',
        link: 'https://www.bensound.com/bensound-music/bensound-love.mp3',
        image: 'https://www.bensound.com/bensound-img/love.jpg',
        artist: 'Benjamin Tissot'
      }

    ]
  }]



  getMusiclist(): Observable<playlist[]> {
    return of(this.allMusicList);
  }
}

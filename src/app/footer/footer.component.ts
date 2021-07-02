import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MusicService } from '../service/music.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  msaapTableHeader! :string;
  msaapTitleHeader!:string;
  msaapArtistHeader!: string;
  currentTrack: any = null;


  constructor(private cdref: ChangeDetectorRef, public music: MusicService) {
    this.music.currentTrack.subscribe(ele=>{
      this.currentTrack = ele
    }) 
    if(!this.currentTrack) this.currentTrack = this.music.allMusicList[0].Tracks;
   }

  ngOnInit(): void {
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

}

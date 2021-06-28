import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component';

@NgModule({
  entryComponents: [PlaylistModalComponent],
  declarations: [
    AppComponent,
    PlaylistModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

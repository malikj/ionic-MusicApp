import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
 
/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  public music = {};
  private file: MediaObject;

  private isMusicPaused = false;

  constructor(
    private media:Media, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.music = this.navParams.get("music");
  }

  ionViewDidLoad() {
  }


  playMusic() {
    if(this.file === null) {
      this.file = this.media.create(this.music["music_url"]);
      this.file.play()
    }
    else {
      if (this.isMusicPaused === true) {
        this.file.play()
        this.isMusicPaused = false;
      }
    }
  }

  pauseMusic(){
    if(this.file !== null) {
     this.file.pause()
     this.isMusicPaused = true;
    }
  }

  stopMusic() {
    if(this.file !== null) {
      this.file.stop()
      this.file.release()
      this.file = null
    }
  }

}

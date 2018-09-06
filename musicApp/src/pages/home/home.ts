import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Icon } from 'ionic-angular';
import { MusicApiProvider } from "../../providers/music-api/music-api"

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from "../music-player/music-player"; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic: Array<any> = [];

  films: Observable<any>;

   constructor(
     private socialsharing: SocialSharing,
     private loadingController:LoadingController, 
     private actionSheetController:ActionSheetController, 
     public navCtrl: NavController, 
     private musicApiProvider: MusicApiProvider
    ){
    
   }

   ionViewDidLoad() {
   let musiclLoadingController = this.loadingController.create( {
     content:"Getting music from server"
   });
   musiclLoadingController.present();
    this.musicApiProvider.getMusic()
    .subscribe((musicList) => {
      musiclLoadingController.dismiss()
      this.allMusic = musicList;
   });
}

shareSong(music) {
let songsActionsheetController = this.actionSheetController.create( {
  title:"Share songs",
  buttons: [
    {
    text: "Share on facebook",
    icon: "logo-facebook",
    handler: () => {
    this.socialsharing.shareViaFacebook(music.name, music.image,music.music_url)
    }
    },
    {
    text: "Share on twitter",
    icon: "logo-twitter",
    handler: () => {
    this.socialsharing.shareViaTwitter(music.name, music.image,music.music_url)
    }
    },
    {
    text: "Share",
    icon: "share",
    handler: () => {
    this.socialsharing.share(music.name,"", music.image,music.music_url)
    }
    },
    {
      text: "Cancel",
      icon: "destructive"
      }
  ]
});

songsActionsheetController.present();
}

goToMusicPlayer(music){
  this.navCtrl.push(MusicPlayerPage, {
    music : music
  });
}
 
addToFavorites(music) {
this.musicApiProvider.addToFavorites(music)
}

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the MusicApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API : string = "https://orangevalleycaa.org/api/music"

@Injectable()
export class MusicApiProvider {

  public favoriteSongs = [];
  constructor(public http: HttpClient) {
    console.log('Hello MusicApiProvider Provider');
  }

 getMusic() {
    return this.http.get<any[]>(API)
    .map(response => response);
  }

  getFavorites() {
   return this.favoriteSongs;
  }

  addToFavorites(song) {
    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong) => {
      return song.id === favoriteSong.id
    });

    if (isSongAdded === -1) {
      this.favoriteSongs.push(song)
    }

  }
}

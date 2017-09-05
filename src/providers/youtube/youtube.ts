import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
key="AIzaSyDGgwriJ-eksaKyDEvW9OYU2Itk-W3VZCI"
  Generated class for the YoutubeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class YoutubeProvider {
  key = 'AIzaSyDGgwriJ-eksaKyDEvW9OYU2Itk-W3VZCI';
  constructor(public http: Http) {
    console.log('Hello YoutubeProvider Provider');
  }
  playlist(channel){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId="+channel+"&key="+this.key)
  }

  playlist_page(channel, pageToken){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId="+channel+"&pageToken="+pageToken+"&key="+this.key)
  }

  playlistList(playlistId){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&key="+this.key)
  }

  playlistList_page(playlistId, pageToken){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken="+pageToken+"&playlistId="+playlistId+"&key="+this.key)
  }
}

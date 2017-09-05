import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { YoutubeProvider } from '../../providers/youtube/youtube';

/*
/**
 * Generated class for the PlaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
  providers: [YoutubeProvider],
})
export class PlaylistPage {
  datas:any;
  nextPageToken:any;
constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private sanitizer: DomSanitizer,
    private yt: YoutubeProvider
  ) {
    yt.playlistList(params.data.id).subscribe(data => {
      this.datas = data.json().items;
      if(data.json().nextPageToken){
        this.nextPageToken = data.json().nextPageToken;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  playVideo(videoId){
  return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId);
  }

  infiniteScrool(ev){
    if(this.nextPageToken){
      this.yt.playlistList_page(this.params.data.id, this.nextPageToken).subscribe(data=>{
        for(let i of data.json().items){
          this.datas.push(i);
        }
        if(!data.json().nextPageToken){
          this.nextPageToken = null;
        }else{
          this.nextPageToken = data.json().nextPageToken;
        }
        ev.complete();
      });
    }else{
      ev.complete();
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube'
/**
 * Generated class for the YoutubePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
  providers: [ YoutubeProvider ]
})
export class YoutubePage {
  channel = 'UCL_nZoWruwco0ZnZsqIgevQ';
  datas:any;
  nextPageToken:any;
  constructor(public navCtrl: NavController, private yt: YoutubeProvider) {
    yt.playlist(this.channel).subscribe(data => {
      this.datas = data.json().items;
      if(data.json().nextPageToken){
        this.nextPageToken = data.json().nextPageToken;
      }
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

  openPlaylist(id){
    this.navCtrl.push('PlaylistPage', {id:id});
  }

  infiniteScroll(ev){
    if(this.nextPageToken){
      this.yt.playlist_page(this.channel,this.nextPageToken).subscribe(data=>{
        for(let i of data.json().items){
          this.datas.push(i);
        }
        ev.complete();
        if(!data.json().nextPageToken){
          this.nextPageToken = null;
        }else{
          this.nextPageToken = data.json().nextPageToken;
        }
      })
    }else{
      ev.complete();
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.refresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.refresh();
  }
refresh(){
  this.items = this.db.list('posts' , {
    query: {
      limitToLast: 15
    }
  }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
}
}

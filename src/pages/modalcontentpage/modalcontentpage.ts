import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the ModalcontentpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modalcontentpage',
  templateUrl: 'modalcontentpage.html',
})
export class ModalcontentpagePage {
  character;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
    public viewCtrl: ViewController, afs:AngularFirestore) {
      this.character=this.navParams.get('res');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalcontentpagePage');
  }

}

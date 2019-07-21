import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { ModalcontentpagePage } from '../modalcontentpage/modalcontentpage';

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})
export class MyBookingsPage {

  user;
  bookings;
  constructor(public ds:DataserviceProvider, public navCtrl: NavController, public navParams: NavParams, public afauth:AngularFireAuth,
  public afs:AngularFirestore, public modalCtrl: ModalController)
   {
      //this.user=ds.user;
      //console.log(this.user);
      this.user=afauth.auth.currentUser.email;
      afs.collection('tablesbooked', ref => ref.where('email', '==', this.user)).valueChanges().subscribe((data)=>{
        this.bookings=data;
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingsPage');
  }
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalcontentpagePage, {
      res:this.bookings[characterNum.charNum]
    });
    modal.present(); 
  }

}

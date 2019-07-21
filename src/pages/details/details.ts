import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { HomePage } from '../home/home';
import { SubDetailsPage } from '../sub-details/sub-details';
export interface ResDetails {data:String,name:String,url:String};

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  private restaurantCollection:AngularFirestoreDocument<ResDetails>;
  details:Observable<ResDetails>;
  identification;
  resDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams, afs:AngularFirestore) {
    this.identification=navParams.get('res');
    //  console.log(this.identification);
  }

  getDetails(i){
    for(var j=0;j<this.identification.length;j++){
      if(i.name==this.identification[j].name){
        this.resDetails=this.identification[j];
        this.navCtrl.push(SubDetailsPage,{
          res:this.resDetails
        });
      }
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
}

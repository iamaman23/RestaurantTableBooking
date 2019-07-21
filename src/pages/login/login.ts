import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { VendorHomePage } from '../vendor-home/vendor-home';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface vendors{
  id: String,
  tablefor2: String,
  tablefor4: String,
  tablefor6: String,
}
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private vendorCollection: AngularFirestoreCollection<vendors>;
  vendors: Observable<vendors[]>;
  vendorDetails;
  user = {} as User;
  constructor(private afauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController, public loadingCtrl:LoadingController, public afs:AngularFirestore,
  public http:HttpClient) {
    this.vendorCollection=afs.collection<vendors>('vendors');
    this.vendors = this.vendorCollection.valueChanges();
    this.vendors.subscribe((data)=>{
      this.vendorDetails=data;
    });
  }
   login(){
      this.afauth.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(data => {
        if(firebase.auth().currentUser.emailVerified==true){
          console.log("got some data",data );
        this.navCtrl.setRoot(HomePage);
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Verify your email to continue',
            buttons: ['OK']
          });
          alert.present();
        }
      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Invalid Email or Password',
          buttons: ['OK']
        });
        alert.present();
      });  
}

register(){
this.navCtrl.push(RegisterPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  } 
  

  vendorLogin(){
    for(var i=0;i<this.vendorDetails.length;i++){
      if(this.user.email==this.vendorDetails[i].id && this.user.password==this.vendorDetails[i].password){
        this.navCtrl.setRoot(VendorHomePage,{
          res:this.vendorDetails
        });
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Invalid Credentials',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    
  }
}

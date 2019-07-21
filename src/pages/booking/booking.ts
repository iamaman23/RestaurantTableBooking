import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { AlertController} from 'ionic-angular';
import { MyBookingsPage } from '../my-bookings/my-bookings';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  resDetails;
  name;
  mobile;
  emailId;
  table;
  mea;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ds:DataserviceProvider,
  private afs:AngularFirestore, public alertCtrl: AlertController, public afauth:AngularFireAuth)
   {
    this.resDetails=navParams.get('res');
    console.log(this.resDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  getFunc(){
    if(this.name==null || this.mobile==null || this.mobile.length!=10){
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Entered details are incorrect',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
          var tableSelected; 
          if(this.mea=="two"){
            tableSelected=2;
          }
          else if(this.mea=="four"){
            tableSelected=4;
          }
          else if(this.mea=="six"){
            tableSelected=6;
          }
          else{
            const alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'Table For cannot be left empty',
              buttons: ['OK']
            });
            alert.present();
          }
          
          console.log(tableSelected);
          for(var i=0;i<this.ds.items.length;i++){
            for(var j=0;j<this.ds.items[i].data.length;j++){
              if(this.resDetails.name==this.ds.items[i].data[j].name){
                var coll=this.ds.items[i].data[j].collectionName;
                var id=this.ds.items[i].data[j].id;
                if(tableSelected==2){
                  this.table=this.ds.items[i].data[j].tablefor2;
                  if(this.table==0){
                    const alert = this.alertCtrl.create({
                      title: 'Sorry!',
                      subTitle: 'No tables are available at this moment',
                      buttons: ['OK']
                    });
                    alert.present();
                    break;
                  }
                  else{
                     this.afs.collection('tablesbooked').add({
                       name: this.name,
                       contactNo: this.mobile,
                       tableFor: "Two People",
                       restaurant:this.ds.items[i].data[j].name,
                       email:this.emailId,
                       status:"Active"
                     });
                     const alert = this.alertCtrl.create({
                      title: 'Success!',
                      subTitle: 'Booking Successful',
                      buttons: ['OK']
                    });
                    alert.present();
                    this.navCtrl.setRoot(MyBookingsPage);
                }
              }
              else if(tableSelected==4){
                this.table=this.ds.items[i].data[j].tablefor4;
                if(this.table==0){
                  const alert = this.alertCtrl.create({
                    title: 'Sorry!',
                    subTitle: 'No tables are available at this moment',
                    buttons: ['OK']
                  });
                  alert.present();
                  break;
                }
                else{
                   this.afs.collection('tablesbooked').add({
                     name: this.name,
                     contactNo: this.mobile,
                     tableFor: "Four People",
                     restaurant:this.ds.items[i].data[j].name,
                     email:this.emailId,
                     status:"Active"
                   });
                   const alert = this.alertCtrl.create({
                    title: 'Success!',
                    subTitle: 'Booking Successful',
                    buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.setRoot(MyBookingsPage);
              }
            }
            else if(tableSelected==6){
              this.table=this.ds.items[i].data[j].tablefor6;
              if(this.table==0){
                const alert = this.alertCtrl.create({
                  title: 'Sorry!',
                  subTitle: 'No tables are available at this moment',
                  buttons: ['OK']
                });
                alert.present();
                break;
              }
              else{
                 this.afs.collection('tablesbooked').add({
                   name: this.name,
                   contactNo: this.mobile,
                   tableFor: "Six People",
                   restaurant:this.ds.items[i].data[j].name,
                   email:this.emailId,
                   status:"Active"
                 });
                 const alert = this.alertCtrl.create({
                  title: 'Success!',
                  subTitle: 'Booking Successful',
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.setRoot(MyBookingsPage);
            }
          } 
         }
       }
     }
    }
  }
}

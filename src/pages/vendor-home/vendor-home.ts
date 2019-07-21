import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AngularFirestore } from 'angularfire2/firestore';



/**
 * Generated class for the VendorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-home',
  templateUrl: 'vendor-home.html',
})
export class VendorHomePage {

  user;
  restaurantDetails;
  pep;
  tablefor6:any=[];
  tablefor4:any=[];
  tablefor2:any=[];
  count2;
  count4;
  count6;
  details;
  constructor(private ds:DataserviceProvider ,public navCtrl: NavController, public navParams: NavParams
        ,public afs:AngularFirestore) {

    this.details=navParams.get('res');
    console.log(ds.items.length);
    console.log(this.details);
    this.user=this.details[0].name;
    console.log(this.user);
    for(var i=0;i<this.ds.items.length;i++){
      for(var j=0;j<this.ds.items[i].data.length;j++){
        if(this.user==ds.items[i].data[j].name){
          console.log(this.user);
          this.restaurantDetails=ds.items[i].data[j];
          console.log(this.restaurantDetails)
        }
      }
    }

    for(var k=0;k<this.details[0].tablefor6;k++){
      this.tablefor6[k]=k+1;
    }
    for(var l=0;l<this.details[0].tablefor4;l++){
      this.tablefor4[l]=l+1;
    }
    for(var m=0;m<this.details[0].tablefor2;m++){
      this.tablefor2[m]=m+1;
    }
    console.log(this.tablefor6);
    this.count2=this.details[0].tablefor2;
    this.count4=this.details[0].tablefor4;
    this.count6=this.details[0].tablefor6;
  }

  
  callMe2(event){
    
    if(event.value==false){
      console.log("False");

      this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
        tablefor2:this.count2+1
      });
      this.count2=this.count2+1
      console.log(this.count2);
    }
    else{
      console.log("True");
      this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
        tablefor2:this.count2-1
      });
      this.count2=this.count2-1;
      console.log(this.count2);
    }
}

callMe4(event){
    
  if(event.value==false){
    console.log("False");

    this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
      tablefor4:this.count4+1
    });
    this.count4=this.count4+1
    console.log(this.count4);
  }
  else{
    console.log("True");
    this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
      tablefor4:this.count4-1
    });
    this.count4=this.count4-1;
    console.log(this.count4);
  }
}

callMe6(event){
    
  if(event.value==false){
    console.log("False");

    this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
      tablefor6:this.count6+1
    });
    this.count6=this.count6+1
    console.log(this.count6);
  }
  else{
    console.log("True");
    this.afs.collection(this.restaurantDetails.collectionName).doc(this.restaurantDetails.id).update({
      tablefor6:this.count6-1
    });
    this.count6=this.count6-1;
    console.log(this.count6);
  }
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorHomePage');
  }

}

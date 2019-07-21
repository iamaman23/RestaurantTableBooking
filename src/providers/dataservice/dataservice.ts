import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable} from 'rxjs';
export interface bakery{
  name: string;
  address: string;
  rating: number;
  averageCost: string;
};
export interface chinese{
  name: string;
  address: string;
  rating: number;
  averageCost: string;
};
export interface italian{
  name: string;
  address: string;
  rating: number;
  averageCost: string;
};
export interface southIndian{
  name: string;
  address: string;
  rating: number;
  averageCost: string;
};
/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataserviceProvider {
  private bakeryCollection: AngularFirestoreCollection<bakery>;
  private chineseCollection: AngularFirestoreCollection<chinese>;
  private italianCollection: AngularFirestoreCollection<italian>;
  private southIndianCollection: AngularFirestoreCollection<southIndian>;
  bakery: Observable<bakery[]>;
  chinese: Observable<chinese[]>;
  italian: Observable<italian[]>;
  southIndian: Observable<southIndian[]>;
  items:any=[];
  bookingDetails;
  user;
  constructor(public http: HttpClient, public afs: AngularFirestore, public afauth:AngularFireAuth) 
  {

    //this.user=this.afauth.auth.currentUser.email;
    this.bakeryCollection = afs.collection<bakery>('bakery');
    this.chineseCollection = afs.collection<chinese>('chinese');
    this.italianCollection = afs.collection<italian>('italian');
    this.southIndianCollection = afs.collection<southIndian>('southIndian');
    this.bakery = this.bakeryCollection.valueChanges();
    this.chinese = this.chineseCollection.valueChanges();
    this.italian = this.italianCollection.valueChanges();
    this.southIndian = this.southIndianCollection.valueChanges();
    this.bakery.subscribe((data)=>{
    var item:any={};
    item.name="Bakery";
    item.data=data;
    this.items[0]=(item);
    });
     this.chinese.subscribe((data)=>{
      var item:any={};
    item.name="Chinese";
    item.data=data;
    this.items[1]=(item);
     });
     this.italian.subscribe((data)=>{
      var item:any={};
    item.name="Italian";
    item.data=data;
    this.items[2]=(item);
     });
     this.southIndian.subscribe((data)=>{
      var item:any={};
    item.name="South Indian";
    item.data=data;
    this.items[3]=(item);
    });

    var ref=afs.collection('tablesbooked',ref =>ref.where('name','==','Aman'));
    var query=ref.valueChanges();
    query.subscribe((data)=>{
      this.bookingDetails=data;
    });
  }

}

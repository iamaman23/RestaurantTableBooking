import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailsPage } from '../details/details';
import { SearchPage } from '../search/search';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
// export interface ResDetails {data:String,name:String,url:String,tables_available:String};
// export interface RestaurantId extends ResDetails {id:String};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items:any=[];
  coll=[{name:'Bakery',url:'http://prayface.net/wp-content/uploads/2014/08/Babycakes-products-450x300.jpg'},
  {name:'Chinese',url:'https://us.123rf.com/450wm/janzwolinski/janzwolinski1511/janzwolinski151100035/48830866-szechuan-chicken-with-white-rice-on-a-plate-decorated-with-chive-and-cocktail-tomato.jpg?ver=6'},
  {name:'Italian',url:'https://skinnyms.com/wp-content/uploads/2016/10/Sweet-Potato-Crusted-Pizza-Recipe-1-450x300.jpg'},
  {name:'South Indian',url:'https://us.123rf.com/450wm/solomonjee/solomonjee1307/solomonjee130700013/21048683-a-traditional-ethnic-south-indian-breakfast-of-idly-idli-rice-cake-served-with-its-condiments-tomato.jpg?ver=6'}];
  particularRestaurantDetail;
  constructor(public navCtrl: NavController, public afs: AngularFirestore,private ds:DataserviceProvider,
  public afauth:AngularFireAuth)
  {
    // console.log(this.coll);
    this.items=ds.items;
  } 
  getId(i){
    console.log(i.name);
    for(var j=0;j<this.items.length;j++){
      if(i.name==this.items[j].name){
        this.particularRestaurantDetail=this.items[j].data;
        this.navCtrl.push(DetailsPage,{
          res:this.particularRestaurantDetail
      });
    }
  }
}
resNames:any=[];
initializeRestros(){
  for(var i=0;i<this.items.length;i++){
    for(var j=0;j<this.items[i].data.length;j++){
    this.resNames.push(this.items[i].data[j].name);
    }
  }
  this.navCtrl.push(SearchPage,{
    res:this.resNames
  });
}
getRestro(ev:any){
  this.initializeRestros();
  const val=ev.target.value;
  if (!val) {
    this.deleteData();
  }
   if (val && val.trim() != '') {
    this.resNames = this.resNames.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    }); 
  } 
}
deleteData(){
  this.resNames=[];
}

logout(){
  this.afauth.auth.signOut().then(()=>{
    this.navCtrl.setRoot(LoginPage);
  })
  console.log("Hi")
}






  // restaurantData;
  // resNames;
  // restaurantId;
  // id;
  // restaurantOnClick;
  // private restaurantCollection:AngularFirestoreCollection<ResDetails>;
  // details:Observable<ResDetails[]>;
  // ids:Observable<RestaurantId[]>;



  
  // constructor(public navCtrl: NavController, public afs: AngularFirestore) {
  //   this.restaurantCollection=afs.collection<ResDetails>('restaurantdetails');
  //   this.details=this.restaurantCollection.valueChanges();
  //   this.details.subscribe((data)=>{
  //     this.restaurantData=data;
  //   });
  // }

  // func(i){
  //   console.log(i);
  // }

  // initializeRestros(){
  //   this.resNames=this.restaurantData;
  // }
  // getRestro(ev:any){
  //   this.initializeRestros();
  //   const val=ev.target.value;
  //   if (!val) {
  //     this.deleteData();
  //   }
  //    if (val && val.trim() != '') {
  //     this.resNames = this.resNames.filter((item) => {
  //       return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     }); 
  //   } 
  // }
  // deleteData(){
  //   this.resNames=[];
  // }

  // getId(i){
  //   this.ids=this.restaurantCollection.snapshotChanges().pipe(
  //     map(actions=> actions.map(a=>{
  //       const data=a.payload.doc.data() as ResDetails;
  //       const id=a.payload.doc.id;
  //       return {id,...data};
  //     }))
  //   );
  //   this.ids.subscribe((data)=>{
  //     this.restaurantId=data;
  //     console.log(this.restaurantId);
  //     // for(let j=0;j<data.length;j++){
  //     //   if(data[j].name==i.name){
  //     //     this.id=data[j].id;
  //     //     this.restaurantOnClick=data[j];
  //     //     console.log(data[j]);
  //         this.navCtrl.push(DetailsPage,{
  //           res:this.restaurantData
  //         });
}

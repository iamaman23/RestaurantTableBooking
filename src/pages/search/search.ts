import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { SubDetailsPage } from '../sub-details/sub-details';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  resNames;
  items:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, ds:DataserviceProvider)
  {
      this.initializeItems();
      this.items=ds.items;
      console.log(this.items);
  }
  initializeItems(){
    this.resNames=this.navParams.get('res');
  }

   getRestro(ev:any){
     this.initializeItems();
       const val=ev.target.value;
        if (val && val.trim() != '') {
         this.resNames = this.resNames.filter((item) => {
           return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
         }); 
       } 
     }
     move(i){
       console.log(i);
       for(var j=0;j<this.items.length;j++){
         for(var k=0;k<this.items[j].data.length;k++){
          if(i==this.items[j].data[k].name){
            this.navCtrl.push(SubDetailsPage,{
              response:this.items[j].data[k]
            })
          }
         }
       }
     }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}

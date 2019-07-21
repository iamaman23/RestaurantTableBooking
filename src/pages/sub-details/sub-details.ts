import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { BookingPage } from '../booking/booking';

declare var google:any;

/**
 * Generated class for the SubDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sub-details',
  templateUrl: 'sub-details.html',
})
export class SubDetailsPage {
  restaurantDetails;
  @ViewChild('map') mapRef:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator:LaunchNavigator)
   {
    if(!navParams.get('res')){
      this.restaurantDetails=navParams.get('response');
      console.log(this.restaurantDetails);
    }
    else{
      this.restaurantDetails=navParams.get('res');
      console.log(this.restaurantDetails);
    }
  }

  ionViewDidLoad() {
    this.DisplayMap();
  console.log(this.mapRef);
    console.log('ionViewDidLoad SubDetailsPage');
  }

  DisplayMap(){
    var lat=this.restaurantDetails.lat;
    var lon=this.restaurantDetails.lon;
    const location = new google.maps.LatLng(lat,lon);
  
    const options = {
      center:location,
      zoom:17,
      streetViewControl:false,
      mapTypeId:'roadmap'
    };
  
    const map = new google.maps.Map(this.mapRef.nativeElement,options);
  
    this.addMarker(location,map);
  }
  
  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map
    });
  }

  navigate(){
    var name=this.restaurantDetails.name;
    this.launchNavigator.navigate(name+' ,Jaipur');
  }
  
  move(){
    this.navCtrl.push(BookingPage,{
      res:this.restaurantDetails
    })
  }
}

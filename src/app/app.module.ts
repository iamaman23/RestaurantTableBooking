import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { DetailsPage } from '../pages/details/details';
import { SubDetailsPage } from '../pages/sub-details/sub-details';
import { SearchPage } from '../pages/search/search';
import { DataserviceProvider } from '../providers/dataservice/dataservice';
import {HttpClientModule} from '@angular/common/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { BookingPage } from '../pages/booking/booking';
import {FormsModule} from '@angular/forms';
import { MyBookingsPage} from '../pages/my-bookings/my-bookings';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ModalcontentpagePage } from '../pages/modalcontentpage/modalcontentpage';
import { VendorHomePage } from '../pages/vendor-home/vendor-home';

const config = {
  apiKey: "AIzaSyB08039lw1S1ZQTUEhKyvEcbYVUoxbV0sY",
  authDomain: "restaurantdb-b1ed4.firebaseapp.com",
  databaseURL: "https://restaurantdb-b1ed4.firebaseio.com",
  projectId: "restaurantdb-b1ed4",
  storageBucket: "restaurantdb-b1ed4.appspot.com",
  messagingSenderId: "1000967156220"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
    SubDetailsPage,
    SearchPage,
    BookingPage,
    MyBookingsPage,
    LoginPage,
    RegisterPage,
    ModalcontentpagePage,
    VendorHomePage
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailsPage,
    SubDetailsPage,
    SearchPage,
    BookingPage,
    MyBookingsPage,
    LoginPage,
    RegisterPage,
    ModalcontentpagePage,
    VendorHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataserviceProvider,
    LaunchNavigator
  ]
})
export class AppModule {
}

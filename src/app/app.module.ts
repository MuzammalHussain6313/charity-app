import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBmQgRPtxBmoCx7yspH4X877x2lFiBCOag',
  authDomain: 'food-distribution-app-fb350.firebaseapp.com',
  databaseURL: 'https://food-distribution-app-fb350.firebaseio.com',
  projectId: 'food-distribution-app-fb350',
  storageBucket: 'food-distribution-app-fb350.appspot.com',
  messagingSenderId: '929354685211',
  appId: '1:929354685211:web:3780621a28f01b84a1d1be',
  measurementId: 'G-NKFBGSVN9C'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig, 'cloud')
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit, DoCheck } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WORKOUTS } from '../../shared/workouts';
import { Storage } from '@ionic/storage';

import { StorageProvider } from '../../providers/storage/storage';


/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage implements OnInit, DoCheck {
  
  workouts;
  history:  any[] = [];

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private storageService: StorageProvider,
      private storage: Storage) {
    this.workouts = WORKOUTS;
    this.history = this.storageService.getHistory();  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  ngOnInit() {
    // this.history = this.storage.get('data').then(val => console.log(val));
    
    // this.getKeys();
    // setTimeout(() => this.getWorkouts(this.storedKeys) ,100);
    
    // this.history = this.storageService.getWorkouts();  
    console.log(this.history);
  }

  ngDoCheck() {
    if(this.history !== this.storageService.history) {
      this.history = this.storageService.getHistory();
      console.log('changed detected');
      return true
    } else {
      console.log('nothing new here');
    }
  }



  clear(){
    this.storageService.clearStorage();
    // this.history = this.storageService.getHistory();  
    
  }
}

// getToken() {
//   return this.storage.get('token').then((token) => {
//       this.token = token;
//       return token;
//   });
// }
// changes to

// getToken: Observable<any> = 
//   Observable.fromPromise(this.storage.get('token').then(token => {
//   //maybe some processing logic like JSON.parse(token)
//   return token;
// }));
// Then in your component you can consume it like would any other observable.

// this.serviceClass.getToken.subscribe(token => { 
// //whatever you want to with the token
// });


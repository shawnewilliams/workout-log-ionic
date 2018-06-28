import { Component, OnInit, DoCheck } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WORKOUTS, COMPLETEDWORKOUTS } from '../../shared/workouts';

import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage';
import { COMMON_DEPRECATED_DIRECTIVES } from '@angular/common/src/directives';


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
  
  workouts: Array<any>;
  history: Array<any>;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private storageService: StorageProvider,
      private storage: Storage) { 

    // this.storage.get('completedWorkouts').then((workouts) => {
    //   this.history = workouts;
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  ngOnInit() {
    // this.storageService.getHistory();
    this.history = this.storageService.getHistory(); 
    console.log('history')
    console.log(this.history)
    
    // console.log(this.storageService.getHistory()); 
    // console.log(this.storageService.history)
  }

  ngDoCheck() {
    if(this.history != this.storageService.history) {
      this.history = this.storageService.getHistory();
      console.log('changed detected');
      // return true
    } else {
      console.log('nothing new here');
    }
  }

  clear(){
    this.storageService.clearStorage();
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


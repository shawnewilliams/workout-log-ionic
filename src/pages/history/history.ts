import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WORKOUTS } from '../../shared/workouts';

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
export class HistoryPage {
  
  workouts;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.workouts = WORKOUTS;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}

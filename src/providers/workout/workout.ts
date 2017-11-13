import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


import { WORKOUTS } from '../../shared/workouts';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorkoutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkoutProvider {
  
  workouts = WORKOUTS;

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello WorkoutProvider Provider');
  }

  getWorkout(workout: string){
    this.workouts.find(found => found.name === workout);
  }

}

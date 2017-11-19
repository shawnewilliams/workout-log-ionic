import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Http, Response } from '@angular/http';
// import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


import { WORKOUTS } from '../../shared/workouts';
import { Workout } from '../../shared/workout';

import 'rxjs/add/operator/map';

/*
  Generated class for the WorkoutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkoutProvider {
  
  workouts = WORKOUTS;

  constructor() {
    console.log('Hello WorkoutProvider Provider');
  }

  getWorkout(workout: string){
    return this.workouts.find(found => found.name === workout);
  }

  // ********* returns numbered sets for each workout [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]]
  getSetsArray(workout: Workout) {
    let count = 0
    const countArray = [];
      workout.exercise.forEach((exercise, index) => {
      countArray.push( (Array.from(new Array(+workout.exercise[index].sets), (x,i) => i + count)) );
      count += +exercise.sets;
      });
    return countArray;
  }
// **********

  // ********* returns numbered sets for each workout [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
  getSetNumArray(workout: Workout){
    const countNumArray = [];
      workout.exercise.forEach((exercise, index) => {
      countNumArray.push( (Array.from(new Array(+workout.exercise[index].sets), (x,i) => i + 1)) );
      });
    return countNumArray.reduce((a, b) => a.concat(b));
  }

  getExerciseNamesArray(workout: Workout) {
    const exerciseNameArray = [];
    workout.exercise.map((item, index)=>{
      exerciseNameArray.push(Array(+workout.exercise[index].sets).fill(workout.exercise[index].name));
    });
    return exerciseNameArray.reduce((a, b) => a.concat(b));
  }

}

import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { WORKOUTS } from '../../shared/workouts';
import { EXERCISES } from '../../shared/exercises';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  history: any[] = []; 
  workouts = WORKOUTS;
  exercises = EXERCISES;

  constructor(
    private storage: Storage) {
    console.log('Hello StorageProvider Provider');
    this.initializeStorage();
  }

  initializeStorage(){
    this.storage.set('Exercises', this.exercises);
    this.storage.set('Workouts', this.workouts);
  }

  getHistory() {
    let history = []
    // this.storage.forEach( (value, key, index) => {
    //   this.storage.get(key).then((val)=> {
    //       history.push(val);
    //       console.log('val');
    //        console.log(val);
    //   });
    // });
    this.storage.get('completedWorkouts').then((workouts) => {
      history = workouts;
      });
    Promise.all(history).then(_=>{console.log('received data from storage')}).catch(err=>{console.log('SHOOT, one failed, aborting')})
    this.history = history;
    console.log('getHistory()');
    console.log(history);
    return history;
  }

  saveCreatedWorkout(value) {
    this.workouts.push(value);
    this.storage.set('Workouts', this.workouts);
  }

  getWorkouts() {
    let workouts = []
    
    this.storage.get('Workouts').then((workout) => {
      workouts = workout;
      });
    Promise.all(workouts).then(_=>{console.log('received data from storage')}).catch(err=>{console.log('SHOOT, one failed, aborting')})
    this.workouts = workouts;
    console.log('getWorkouts()');
    console.log(workouts);
    return workouts;
  }

  saveCreatedExercise(value) {
    this.exercises.push(value);
    this.storage.set('Exercises', this.exercises);
  }

  getExercises() {
    let exercises = []
    
    this.storage.get('Exercises').then((exercise) => {
      exercises = exercise;
      });
    Promise.all(exercises).then(_=>{console.log('received data from storage')}).catch(err=>{console.log('SHOOT, one failed, aborting')})
    this.exercises = exercises;
    console.log('getExercises()');
    console.log(exercises);
    return exercises;
  }

  saveCompletedWorkout(value){
    this.history.push(value)
    console.log('history after saveWorkout()')
    console.log(this.history);
    this.storage.set('completedWorkouts', this.history);
  }

  clearStorage(){
    this.storage.clear();
    this.getHistory();
    this.initializeStorage();
  }
}

import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { WORKOUTS, COMPLETEDWORKOUTS } from '../../shared/workouts';
import { EXERCISES } from '../../shared/exercises';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  history: Array<any>;
  workouts = WORKOUTS;
  exercises = EXERCISES;

  constructor(
    private storage: Storage) {
    console.log('Hello StorageProvider Provider');
    this.history = [];
    this.getHistory();
    this.initializeExercises();
    this.initializeWorkouts();
  }

  initializeExercises(){
    let exercises = [];
    this.storage.get('Exercises').then((data) => {
      if(data != null){
        exercises.push(data)
        this.exercises = exercises;
        this.storage.set('Exercises', this.exercises);
      } else {
        this.storage.set('Exercises', this.exercises);
      }
    });
  }

  initializeWorkouts(){
    this.storage.get('Workouts'). then((data) => {
      if(data != null){
        this.storage.set('Workouts', data);
      } else {
        this.storage.set('Workouts', this.workouts);
      }
    });
  }

  saveCompletedWorkout(value){
    this.storage.get('completedWorkouts').then((data) => {
      if(data != null){
        data.push(value);
        this.storage.set('completedWorkouts', data)
      } else {
        let array = []
        array.push(value);
        this.storage.set('completedWorkouts', array);
      }
    });
   this.getHistory();
  }

  getHistory() { 
    let history = [];
    this.storage.get('completedWorkouts').then((workouts) => {
      if(workouts != null) {
        history.push(workouts);
      }
      return history
    });
      this.history = history;
      return history
  }

  saveCreatedWorkout(value) {
    this.storage.get('workouts').then((data) => {
      if(data != null){
        data.push(value);
        this.storage.set('workouts', data);
      } else {
        let array = []
        array.push(value);
        this.storage.set('workouts', array);
      }
    });
  }

  getWorkouts() {
    let workouts = []
    
    this.storage.get('Workouts').then((data) => {
      if(data != null){
      workouts.push(data);
      }
      return workouts
      });
    return workouts;
  }

  saveCreatedExercise(value) {
    this.storage.get('Exercises').then((data) => {
      if(data != null){
        data.push(value);
        this.storage.set('Exercises', data);
      } else {
        let array = []
        array.push(value);
        this.storage.set('Exercises', array);
      }
    })
    // this.exercises.push(value);
    // this.storage.set('Exercises', this.exercises);
  }

  getExercises() {
    let exercises = [];
    
    this.storage.get('Exercises').then((data) => {
      if(data != null){
      exercises.push(data);
      }
      return exercises
      });
    this.exercises = exercises;
    return exercises; 
  }

  clearStorage(){
    this.storage.clear();
    this.history = [];
    this.exercises = EXERCISES;
    // this.initializeStorage();
  }
}

import { Component, OnInit, DoCheck } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HTTP } from '@ionic-native/http';

import { Exercise } from '../../shared/exercise';
import { EXERCISES } from '../../shared/exercises';

import { Workout } from '../../shared/workout';
import { WORKOUTS } from '../../shared/workouts';
import { AddWorkoutPage } from '../add-workout/add-workout';
import { DoWorkoutPage } from '../do-workout/do-workout';

import { WorkoutProvider } from '../../providers/workout/workout';
import { StorageProvider } from '../../providers/storage/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, DoCheck {

  showWorkouts: boolean;
  showWorkout: boolean;
  showExercises: boolean;
  exercises;
  workouts: Workout[];
  newExerciseForm: FormGroup;
  newWorkoutForm: FormGroup;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private storageService: StorageProvider,
    private http: HTTP) {

    this.showWorkouts = true;
    this.showWorkout = false;
    this.showExercises = true;
    
    this.getExercisesFromServer()
    console.log("EXERCISES", this.exercises);
    // this.exercises = storageService.exercises;
    this.workouts = WORKOUTS.concat(storageService.getWorkouts());
    
  }

  ngOnInit() {
    this.newExerciseForm = this.formBuilder.group({
      exercise: ['', Validators.required]
    });

    this.newWorkoutForm = this.formBuilder.group({
      workout: ['', Validators.required]
    });
  }

  ngDoCheck() {
    if(this.exercises != this.storageService.exercises) {
      // this.exercises = this.storageService.getExercises();
      console.log('changed detected');
    } else {
      console.log('nothing new here');
    }
  }

  toggleWorkouts(){
    this.showWorkouts = !this.showWorkouts;
  }

  toggleExercises(){
    this.showExercises = !this.showExercises;
  }
 
  addExercise(){
    this.exercises.push(this.newExerciseForm.value.exercise);
    this.storageService.saveCreatedExercise(this.newExerciseForm.value.exercise);
    this.newExerciseForm.reset();
  }

  addWorkout(){
    this.workouts.push(this.newWorkoutForm.value.workout)
    this.newWorkoutForm.reset();
  }

  openAddWorkout() {
    let modal = this.modalCtrl.create(AddWorkoutPage);
    modal.present();
  }

  toggleWorkout() {
    this.showWorkout = !this.showWorkout
  }

  workoutSelected(event, workout) {
    this.navCtrl.push(DoWorkoutPage,{
      workout: workout
    });
  }

  getExercisesFromServer() {
    this.http.get('http://localhost:3000/exercises', {}, {
    })
    .then(data => {
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
      let ex = JSON.parse(data.data);
      this.exercises = ex.exercises.map((exercise) => {
        return exercise.name;
      });
      console.log(this.exercises);
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }

}

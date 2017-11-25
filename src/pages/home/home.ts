import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


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
export class HomePage implements OnInit {

  showWorkouts: boolean;
  showWorkout: boolean;
  showExercises: boolean;
  exercises: string[];
  workouts: Workout[];
  newExerciseForm: FormGroup;
  newWorkoutForm: FormGroup;


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private storageService: StorageProvider) {

    this.showWorkouts = true;
    this.showWorkout = false;
    this.showExercises = true;

    this.exercises = EXERCISES.sort();
    this.workouts = WORKOUTS.sort();
    
  }

  ngOnInit() {
    this.newExerciseForm = this.formBuilder.group({
      exercise: ['', Validators.required]
    });

    this.newWorkoutForm = this.formBuilder.group({
      workout: ['', Validators.required]
    });
    
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

}

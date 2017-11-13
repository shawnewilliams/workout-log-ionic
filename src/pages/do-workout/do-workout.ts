import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

// import { WorkoutProvider } from '../../providers/workout/workout';
import { Workout } from '../../shared/workout';
import { WORKOUTS } from '../../shared/workouts';
import { Exercise } from '../../shared/exercise';

import { CompletedWorkout, CompletedExercise, CompletedSet } from '../../shared/completed-workout';

/**
 * Generated class for the DoWorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-do-workout',
  templateUrl: 'do-workout.html',
})
export class DoWorkoutPage implements OnInit {
  
  workout: string;
  currentWorkout: Workout;
  savedWorkouts: Workout[];
  sets;

  showWorkout;

  workoutForm: FormGroup;
  items: FormArray;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder) {

      this.workout = this.navParams.get('workout');
      console.log(this.workout)
      this.showWorkout = [];
      
  }

  ngOnInit() {

    this.savedWorkouts = WORKOUTS;
    this.currentWorkout = this.savedWorkouts.find( found => found.name === this.workout);
    // Gives me an array of sets to for my *ngFor in the template
    this.sets = this.currentWorkout.exercise.map(item => new Array(+item.sets));
    // console.log(this.sets);
    // console.log(this.currentWorkout);

    this.showWorkout = this.currentWorkout.exercise.map(() => true);
    // console.log(this.currentWorkout)
    // console.log(this.showWorkout)
    
    this.workoutForm = this.formBuilder.group({
      workoutName: '',
      items: this.formBuilder.array([ this.createItem() ])
    });

    this.currentWorkout.exercise.forEach(() => {
      this.addItem();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoWorkoutPage');
  }

  toggleWorkout(index) {
    this.showWorkout[index] = !this.showWorkout[index];
    console.log(this.showWorkout)
  }

  addSet(exercise){
    console.log(exercise.sets);
    exercise.sets += 1;
    this.ngOnInit()
  }

  deleteSet(item: ItemSliding, exercise){
    if (exercise.sets > 0){
      exercise.sets -= 1;
    }
    this.ngOnInit()
  }

  onSubmit(){
    this.savedWorkouts.push(this.workoutForm.value);
    console.log(this.workoutForm.value);
    this.navCtrl.pop();
  }

  createItem(): FormGroup {
     
      return this.formBuilder.group({
        exerciseName: '',
        setNum: null,
        weight: null,
        reps: null
      });
  }

  addItem(): void {
    this.items = this.workoutForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

}

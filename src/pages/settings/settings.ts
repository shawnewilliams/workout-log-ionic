import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

// import { WorkoutProvider } from '../../providers/workout/workout';
import { Workout } from '../../shared/workout';
import { WORKOUTS } from '../../shared/workouts';
import { Exercise } from '../../shared/exercise';

import { CompletedWorkout, CompletedExercise, CompletedSet } from '../../shared/completed-workout';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  workout: string;
  currentWorkout: Workout;
  savedWorkouts: Workout[];
  sets;
  flattenedSets;

  showWorkout;

  orderForm: FormGroup;
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
    // this.currentWorkout = this.savedWorkouts.find( found => found.name === this.workout);
    this.currentWorkout = this.savedWorkouts[0];
    
    // console.log(this.sets);
    // console.log(this.currentWorkout);

    // this.showWorkout = this.currentWorkout.exercise.map(() => true);
    // console.log(this.currentWorkout)
    // console.log(this.showWorkout)
    
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([])
    });

    // Gives me an array of sets to for my *ngFor in the template
    this.sets = this.currentWorkout.exercise.map((item) => {
      // return new Array(item.sets);
      return Array.apply(null, { length: item.sets })
    });

    this.flattenedSets = this.sets.reduce((a, b) => a.concat(b))
    this.flattenedSets.forEach(() => this.addItem())
    console.log(this.sets);
    console.log(this.currentWorkout);
    console.log(this.flattenedSets)


    // this.currentWorkout.exercise.forEach(() => {
    //   this.addItem();
    // });
    // console.log(this.setsToArray(this.currentWorkout, 0))
    // this.setsToArray(this.currentWorkout, 0).forEach(() => {
    //   return this.addItem();
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoWorkoutPage');
  }

  toggleWorkout(index) {
    this.showWorkout[index] = !this.showWorkout[index];
    console.log(this.showWorkout)
  }

  setsToArray(workout: Workout, index){
    // console.log(+(workout.exercise[index].sets))
    // console.log(new Array(workout.exercise[index].sets))
    
    var arr = Array.apply(null, Array(workout.exercise[index].sets));
    return arr.map(function (x, i) { return i });

    
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
    console.log(this.orderForm.value)
    this.orderForm.reset();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

}

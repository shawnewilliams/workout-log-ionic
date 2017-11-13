import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EXERCISES } from '../../shared/exercises';
import { Exercise } from '../../shared/exercise';

import { Workout } from '../../shared/workout';
import { WORKOUTS } from '../../shared/workouts';

// import { WorkoutProvider } from '../../providers/workout/workout';

/**
 * Generated class for the AddWorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-workout',
  templateUrl: 'add-workout.html',
})
export class AddWorkoutPage implements OnInit{
  
  addWorkoutForm: FormGroup;
  exercises;
  savedWorkouts;
  workouts: Workout[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

      this.addWorkoutForm = this.formBuilder.group({
        name: ['', Validators.required],
        exercise: ['', Validators.required],
        sets: ['', Validators.required]
        
      });
  }

  ngOnInit() {

    this.workouts = []
    this.exercises = EXERCISES;
    this.savedWorkouts = WORKOUTS;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWorkoutPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  addWorkout() {
    console.log(this.addWorkoutForm.value)
    this.workouts.push(this.addWorkoutForm.value);
    if(this.savedWorkouts.find(workout => workout.name === this.addWorkoutForm.value.name)){
    this.savedWorkouts.find(workout => workout.name === this.addWorkoutForm.value.name).exercise.push(
      {
        name: this.addWorkoutForm.value.exercise, 
        sets: this.addWorkoutForm.value.sets
      });
    console.log(this.savedWorkouts);
    } else {
      this.savedWorkouts.push({
        
          name: this.addWorkoutForm.value.name,
          exercise: [ 
              {
                  name: this.addWorkoutForm.value.exercise,
                  sets: this.addWorkoutForm.value.sets
              }
          ]
      });
    }
    
    this.addWorkoutForm = this.formBuilder.group({
      name: [this.addWorkoutForm.value.name, Validators.required],
      exercise: ['', Validators.required],
      sets: ['', Validators.required]
    });
  }

}

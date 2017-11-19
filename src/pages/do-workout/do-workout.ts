import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

// import { WorkoutProvider } from '../../providers/workout/workout';
import { Workout } from '../../shared/workout';
import { WORKOUTS } from '../../shared/workouts';
import { Exercise } from '../../shared/exercise';
import { WorkoutProvider} from '../../providers/workout/workout';

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
  sets;  // flattenedSets;

  showWorkout; //toggle workout

  workoutForm: FormGroup;
  items: FormArray;

  exerciseName = '';
  exerciseNameArray = [];
  count: number;
  countArray: any[];
  arrayCount: number;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private workoutService: WorkoutProvider) {

      this.workout = this.navParams.get('workout');
      // console.log(this.workout)
      this.showWorkout = []; //toggles workout

      this.countArray = [];
      
  }

  ngOnInit() {
    
    this.savedWorkouts = WORKOUTS;
    this.currentWorkout = this.workoutService.getWorkout(this.workout);
    // console.log(this.sets);
    // console.log(this.currentWorkout);

    this.showWorkout = this.currentWorkout.exercise.map(() => true);
    // console.log(this.currentWorkout)
    // console.log(this.showWorkout)
    
    this.workoutForm = this.formBuilder.group({
      workoutName: this.workout,
      items: this.formBuilder.array([])
    });

    // ********* i.e. sets = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]]
    this.sets = this.workoutService.getSetsArray(this.currentWorkout);

    this.currentWorkout.exercise.map((item, index)=>{
      return this.exerciseNameArray.push(Array(+this.currentWorkout.exercise[index].sets).fill(this.currentWorkout.exercise[index].name))
    });

    this.exerciseNameArray = this.exerciseNameArray.reduce((a, b) => a.concat(b))
    
    this.exerciseNameArray.forEach((exercise, index) => {
      this.exerciseName = this.exerciseNameArray[index];
      // this.count.push(index)
      this.addItem()

      this.count = -1;
    });

// ********* returns an array [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]]
    this.countArray = this.workoutService.getSetsArray(this.currentWorkout);
// **********

    console.log(this.sets);
    console.log(this.currentWorkout);

    console.log(this.exerciseNameArray);
    console.log(this.countArray);
  }

  ngAfterViewInit() {
    this.incrementNumber();
    this.changeDetectorRef.detectChanges();
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
        exerciseName: this.exerciseName,
        setNum: '',
        weight: '',
        reps: ''
      });
    }

  addItem(): void {
    this.items = this.workoutForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  incrementNumber() {
    if(this.count < this.exerciseNameArray.length){
      this.count++;
    }
    
    this.changeDetectorRef.detectChanges();
    return this.count
  }

}

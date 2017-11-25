import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Storage } from '@ionic/storage';


// import { WorkoutProvider } from '../../providers/workout/workout';
import { Workout } from '../../shared/workout';
import { WORKOUTS, COMPLETEDWORKOUTS } from '../../shared/workouts';
import { Exercise } from '../../shared/exercise';
import { WorkoutProvider} from '../../providers/workout/workout';
import { StorageProvider } from '../../providers/storage/storage';

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
  sets: number[];

  showWorkout: boolean[]; //toggle workout

  workoutForm: FormGroup;
  items: FormArray;

  exerciseNameArray: String[];
  setNumArray: number[];
  countArray: any[];

  // completedWorkouts: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private workoutService: WorkoutProvider,
    private storage: Storage,
    private storageService: StorageProvider) {

      this.workout = this.navParams.get('workout');
      
  }

  ngOnInit() {
    
    this.savedWorkouts = WORKOUTS;
    // this.completedWorkouts = COMPLETEDWORKOUTS;
  
    this.currentWorkout = this.workoutService.getWorkout(this.workout);

    this.showWorkout = this.currentWorkout.exercise.map(() => true); //toggle workout array
    
    this.workoutForm = this.formBuilder.group({
      workoutName: this.workout,
      date: new Date,
      items: this.formBuilder.array([])
    });
  

    // ********* i.e. sets = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]]
    this.sets = this.workoutService.getSetsArray(this.currentWorkout);

    // ********* returns an array like [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
    this.setNumArray = this.workoutService.getSetNumArray(this.currentWorkout);

    // ******** returns an array of exercise names
    this.exerciseNameArray = this.workoutService.getExerciseNamesArray(this.currentWorkout);

    this.addItems(this.exerciseNameArray, this.setNumArray);

    console.log(this.currentWorkout);
    console.log(this.sets);
    console.log(this.exerciseNameArray);
    console.log(this.countArray);
    console.log(this.setNumArray);
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
    this.saveData();
    this.navCtrl.pop();
  }

  createItem(name, num): FormGroup {
      return this.formBuilder.group({
        exerciseName: name,
        setNum: num,
        weight: '',
        reps: ''
      });
    }

  addItem(name, num): void {
    this.items = this.workoutForm.get('items') as FormArray;
    this.items.push(this.createItem(name, num));
  }

  addItems(namesArray, setNumsArray) {
    namesArray.forEach((exercise, index) => {
      const name = exercise;
      const setNum = setNumsArray[index];
      this.addItem(name, setNum);
      });
    }

  saveData(){
    // let completedWorkouts = this.storageService.getHistory();
    // completedWorkouts.push(this.workoutForm.value);
    // console.log('completedWorkouts');
    // console.log(completedWorkouts)
    // this.storageServi  ce.saveWorkout(this.workoutForm.value.date.toString(), this.workoutForm.value);
    // this.storageService.history.push(this.workoutForm.value);
    this.storageService.saveCompletedWorkout(this.workoutForm.value);
    
  }


}

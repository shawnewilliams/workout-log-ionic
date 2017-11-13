import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWorkoutPage } from './add-workout';

@NgModule({
  declarations: [
    AddWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWorkoutPage),
  ],
})
export class AddWorkoutPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoWorkoutPage } from './do-workout';

@NgModule({
  declarations: [
    DoWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(DoWorkoutPage),
  ],
})
export class DoWorkoutPageModule {}

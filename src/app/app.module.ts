import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { HistoryPage } from '../pages/history/history';

import { TabsPage } from '../pages/tabs/tabs';
import { AddWorkoutPage } from '../pages/add-workout/add-workout';
import { DoWorkoutPage } from '../pages/do-workout/do-workout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WorkoutProvider } from '../providers/workout/workout';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    SettingsPage,
    HistoryPage,
    HomePage,
    TabsPage,
    AddWorkoutPage,
    DoWorkoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    SettingsPage,
    HistoryPage,
    HomePage,
    TabsPage,
    AddWorkoutPage,
    DoWorkoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WorkoutProvider,
    ProcessHttpmsgProvider
  ]
})
export class AppModule {}

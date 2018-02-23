import { AppsService } from './services/apps.service';
import { MaterialModule } from './modules/material.module';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { QueryBrowserComponent } from './components/query-browser/query-browser.component';
import { AppSwitcherComponent } from './components/app-switcher/app-switcher.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryBrowserComponent,
    AppSwitcherComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    AppsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

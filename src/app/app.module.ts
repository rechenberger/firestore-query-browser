import { HistoryService } from './services/history.service'
import { AuthService } from './services/auth.service'
import { AppsService } from './services/apps.service'
import { MaterialModule } from './modules/material.module'
import { DataService } from './services/data.service'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'


import { QueryBrowserComponent } from './components/query-browser/query-browser.component'
import { AppSwitcherComponent } from './components/app-switcher/app-switcher.component'
import { MainComponent } from './components/main/main.component'
import { LoginComponent } from './components/login/login.component'
import { StorageService } from './services/storage.service'
import { AuthSwitcherService } from './services/auth-switcher.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { AuthSwitcherComponent } from './components/auth-switcher/auth-switcher.component'
import { QueryBrowserResultComponent } from './components/query-browser-result/query-browser-result.component'
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component'
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component'
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component'
import { DialogService } from './services/dialog.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AddAppComponent } from './components/add-app/add-app.component';
import { QueryInputComponent } from './components/query-input/query-input.component'


@NgModule({
  declarations: [
    AppComponent,
    QueryBrowserComponent,
    AppSwitcherComponent,
    MainComponent,
    LoginComponent,
    AuthSwitcherComponent,
    QueryBrowserResultComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    CreateDialogComponent,
    ToolbarComponent,
    AddAppComponent,
    QueryInputComponent
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
    AppsService,
    AuthService,
    StorageService,
    AuthSwitcherService,
    DialogService,
    HistoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    EditDialogComponent,
    CreateDialogComponent
  ]
})
export class AppModule { }

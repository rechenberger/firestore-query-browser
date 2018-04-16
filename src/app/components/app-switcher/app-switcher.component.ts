import { AppsService } from './../../services/apps.service';
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit {

  configString = `{
    apiKey: "AIzaSyCzpisEJhHYFR09Rh48NAQX6g3gwG2v2U0",
    authDomain: "firestore-query-browser.firebaseapp.com",
    databaseURL: "https://firestore-query-browser.firebaseio.com",
    projectId: "firestore-query-browser",
    storageBucket: "firestore-query-browser.appspot.com",
    messagingSenderId: "567385024694"
  }`

  showNew = false

  apps

  constructor(
    public appsService: AppsService,
    private snackbar: MatSnackBar
  ) {
    this.reloadApps()
  }

  ngOnInit() {
  }

  submitNew() {
    try {
      this.appsService.newApp(this.configString)
      this.reloadApps()
      this.showNew = false
    } catch (e) {
      this.snackbar.open(e, 'OK', { duration: 5000 })
    }
  }

  reloadApps() {
    this.apps = this.appsService.apps()
  }

  pick(projectId) {
    this.appsService.activeProjectId = projectId
  }

}

import { AppsService } from './../../services/apps.service';
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit {

  configString = `{
    apiKey: "AIzaSyBpFFZomGDJK-pzaN1g6IoglAF6YCxl43Q",
    authDomain: "crowd-e.firebaseapp.com",
    databaseURL: "https://crowd-e.firebaseio.com",
    projectId: "crowd-e",
    storageBucket: "crowd-e.appspot.com",
    messagingSenderId: "920940631373"
  }`

  showNew = false

  apps = this.appsService.apps()

  constructor(
    private appsService: AppsService
  ) { }

  ngOnInit() {
  }

  submitNew() {
    this.appsService.newApp(this.configString)
  }

  switch() {
  }

}

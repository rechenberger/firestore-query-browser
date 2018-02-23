import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'

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

  constructor() { }

  ngOnInit() {
  }

  switch() {
    const json = this.configString.replace(/([a-zA-Z]*)(: ")/g, `"$1"$2`)
    const config = JSON.parse(json)
    firebase.initializeApp(config, 'app1')
    console.log('firebase.apps', firebase.apps)
  }

}

import { Component, OnInit } from '@angular/core'
import { AppsService } from '../../services/apps.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss']
})
export class AddAppComponent implements OnInit {

  configString = `{
    apiKey: "AIzaSyCzpisEJhHYFR09Rh48NAQX6g3gwG2v2U0",
    authDomain: "firestore-query-browser.firebaseapp.com",
    databaseURL: "https://firestore-query-browser.firebaseio.com",
    projectId: "firestore-query-browser",
    storageBucket: "firestore-query-browser.appspot.com",
    messagingSenderId: "567385024694"
  }`

  constructor(
    private appsService: AppsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitNew() {
    try {
      this.appsService.newApp(this.configString)
      this.router.navigate(['/'])
    } catch (e) {
      this.snackbar.open(e, 'OK', { duration: 5000 })
    }
  }

}

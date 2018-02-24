import { AuthService } from './../../services/auth.service'
import { Component, OnInit, AfterViewInit } from '@angular/core'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initUI()
  }

  initUI() {
    const ui = new firebaseui.auth.AuthUI(this.auth.auth);
    // The start method will wait until the DOM is loaded.
    const uiConfig = {
      signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>'
    }

    ui.start('.firebaseui', uiConfig)
  }

  isLoggedIn() {
    return !!this.auth.currentUser
  }
}

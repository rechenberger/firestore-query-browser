import { AuthService } from './../../services/auth.service'
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  checkInterval

  ngOnInit() {
    this.checkInterval = setInterval(() => {
      this.checkRedirect()
    }, 500)
  }

  ngOnDestroy() {
    clearInterval(this.checkInterval)
  }

  checkRedirect() {
    if (!!this.auth.currentUser) {
      return this.router.navigate(['/'])
    }
  }

  ngAfterViewInit() {
    try {
      this.initUI()
    } catch (error) {
      window.location.reload()
    }
  }

  initUI() {
    const ui = new firebaseui.auth.AuthUI(this.auth.auth)
    // The start method will wait until the DOM is loaded.
    const uiConfig = {
      signInSuccessUrl: '/',
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

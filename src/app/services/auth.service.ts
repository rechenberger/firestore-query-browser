import { AppsService } from './apps.service'
import * as firebase from 'firebase'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {

  currentUser

  constructor(
    private apps: AppsService
  ) {
    this.auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  }

  get auth() {
    return firebase.auth(this.apps.activeApp)
  }

  logout() {
    return this.auth.signOut()
  }

}

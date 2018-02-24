import { AppsService } from './apps.service'
import * as firebase from 'firebase'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {

  get currentUser() {
    return this.auth.currentUser
  }

  constructor(
    private apps: AppsService
  ) { }

  get auth() {
    return firebase.auth(this.apps.activeApp)
  }

  logout() {
    return this.auth.signOut()
  }

}

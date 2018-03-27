import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { AppsService } from './apps.service'
import { StorageService } from './storage.service'

@Injectable()
export class AuthSwitcherService {

  constructor(
    private auth: AuthService,
    private apps: AppsService,
    private storage: StorageService
  ) {
    this.auth.auth.onAuthStateChanged(user => {
      const currentUserData = this.currentUserData
      this.currentUsers = {
        ...this.currentUsers,
        [currentUserData.email]: currentUserData
      }
    })
  }

  key = 'users'

  public get currentUsers() {
    return this.storage.get<any>(this.key, {})
  }

  public set currentUsers(users) {
    this.storage.set(this.key, users)
  }

  public get currentUserData() {
    return JSON.parse(localStorage.getItem(this.firebaseAuthKey))
  }

  public set currentUserData(userData) {
    const value = JSON.stringify(userData)
    localStorage.setItem(this.firebaseAuthKey, value)
  }

  public get firebaseAuthKey(): string {
    const { projectId, apiKey } = this.apps.activeApp.options
    return `firebase:authUser:${apiKey}:${projectId}`
  }


  watchUsers() {
    return this.storage.watch(this.key, {})
      .asObservable()

  }

  switchUser(user) {
    this.currentUserData = user
    window.location.reload(true)
  }

}

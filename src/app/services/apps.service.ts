import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as _ from 'lodash'
import { ReplaySubject } from 'rxjs'
import { StorageService } from './storage.service'

@Injectable()
export class AppsService {
  constructor(
    public storage: StorageService
  ) {
    this.loadApps()
    this.activeProjectId = this.storage.get(this.activeProjectIdStorageKey)
  }

  activeApp
  private _activeProjectId
  activeProjectIdChanged = new ReplaySubject(1)
  activeProjectIdStorageKey = 'active-project-id'
  appsStorageKey = 'apps'

  get activeProjectId() {
    return this._activeProjectId
  }
  set activeProjectId(activeProjectId: string) {
    this._activeProjectId = activeProjectId
    this.activeProjectIdChanged.next(activeProjectId)
    if (this.activeProjectId) {
      this.storage.set(this.activeProjectIdStorageKey, this.activeProjectId)
      this.activeApp = _.find(firebase.apps, app => app.options.projectId === this.activeProjectId)
    }
  }

  string2config(configString: string): any {
    const json = configString.replace(/([a-zA-Z]*)(: ")/g, `"$1"$2`)
    const config = JSON.parse(json)
    return config
  }

  newApp(config: any | string, store = true) {
    // console.log('config', config)
    if (typeof config === 'string') config = this.string2config(config)
    const projectId = config.projectId
    firebase.initializeApp(config, projectId)
    if (store) {
      this.storeApps()
      this.activeProjectId = projectId
    }
  }

  storeApps() {
    const configs = firebase.apps.map(app => app.options)
    this.storage.set(this.appsStorageKey, configs)
  }

  loadApps() {
    const configs = this.storage.get<any>(this.appsStorageKey)
    if (!configs) return
    configs.forEach(config => {
      this.newApp(config, false)
    })
  }

  apps() {
    return firebase.apps.map(app => app.options)
  }

}

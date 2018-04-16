import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as _ from 'lodash'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class AppsService {

  activeApp
  private _activeProjectId
  activeProjectIdChanged = new ReplaySubject(1)

  get activeProjectId() {
    return this._activeProjectId
  }
  set activeProjectId(activeProjectId: string) {
    this._activeProjectId = activeProjectId
    this.activeProjectIdChanged.next(activeProjectId)
    if (this.activeProjectId) {
      localStorage.setItem('fqb-activeProjectId', this.activeProjectId)
      this.activeApp = _.find(firebase.apps, app => app.options.projectId == this.activeProjectId)
    }
  }

  constructor() {
    this.loadApps()
    this.activeProjectId = localStorage.getItem('fqb-activeProjectId')
  }

  string2config(configString: string): any {
    const json = configString.replace(/([a-zA-Z]*)(: ")/g, `"$1"$2`)
    const config = JSON.parse(json)
    return config
  }

  newApp(config: any | string, store = true) {
    // console.log('config', config)
    if (typeof config == 'string') config = this.string2config(config)
    const projectId = config.projectId
    firebase.initializeApp(config, projectId)
    if (store) {
      this.storeApps()
      this.activeProjectId = projectId
    }
  }

  storeApps() {
    const configs = firebase.apps.map(app => app.options)
    const string = JSON.stringify(configs)
    localStorage.setItem('fqb-apps', string)
  }

  loadApps() {
    const string = localStorage.getItem('fqb-apps')
    const configs = JSON.parse(string)
    if (!configs) return
    configs.forEach(config => {
      this.newApp(config, false)
    })
  }

  apps() {
    return firebase.apps.map(app => app.options)
  }

}

import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import * as _ from 'lodash'

@Injectable()
export class AppsService {

  activeApp
  private _activeProjectId

  get activeProjectId() {
    return this._activeProjectId
  }
  set activeProjectId(activeProjectId: string) {
    this._activeProjectId = activeProjectId
    this.activeApp = _.find(firebase.apps, app => app.options.projectId == this.activeProjectId)
  }

  constructor() {
    this.loadApps()
  }

  string2config(configString: string): any {
    const json = configString.replace(/([a-zA-Z]*)(: ")/g, `"$1"$2`)
    const config = JSON.parse(json)
    return config
  }

  newApp(config: any | string, store = true) {
    if (typeof config == 'string') config = this.string2config(config)
    const projectId = config.projectId
    firebase.initializeApp(config, projectId)
    this.activeProjectId = projectId
    if (store) this.storeApps()
  }

  storeApps() {
    const configs = firebase.apps.map(app => app.options)
    const string = JSON.stringify(configs)
    localStorage.setItem('fqb-apps', string)
  }

  loadApps() {
    const string = localStorage.getItem('fqb-apps')
    const configs = JSON.parse(string)
    configs.forEach(config => {
      this.newApp(config, false)
    })
  }

  apps() {
    return firebase.apps.map(app => app.options)
  }

}

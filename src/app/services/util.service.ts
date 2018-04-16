import { Injectable } from '@angular/core'

@Injectable()
export class UtilService {

  constructor() { }

  gotoConsole(entity: { path: string }) {
    const relativeUrl = entity.path.split('/').join('~2F')
    const url = `https://console.firebase.google.com/project/${this.apps.activeProjectId}/database/firestore/data~2F${relativeUrl}`
    window.open(url)
  }

}

import { Injectable } from '@angular/core'
import { AppsService } from './apps.service';

@Injectable()
export class UtilService {

  constructor(
    private apps: AppsService
  ) { }

  gotoConsole(entity: { path: string }) {
    const relativeUrl = entity.path.split('/').join('~2F')
    const url = `https://console.firebase.google.com/project/${this.apps.activeProjectId}/database/firestore/data~2F${relativeUrl}`
    window.open(url)
  }

}

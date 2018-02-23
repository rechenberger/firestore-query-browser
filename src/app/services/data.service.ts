import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'

@Injectable()
export class DataService {

  constructor(
    private apps: AppsService
  ) {

  }

  async get(options) {
    options = options || {}
    options.path = options.path || ''
    options.isCollection = options.isCollection
      || (options.path.split('/').length % 2 == 1)

    const firestore = firebase.firestore(this.apps.activeApp)

    const data = options.isCollection
      ? firestore.collection('mandants').get()
        .then(snap => snap.docs.map(doc => doc.data()))
      : null

    return data
  }



}

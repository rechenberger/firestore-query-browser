import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'

@Injectable()
export class DataService {

  constructor(
    private apps: AppsService
  ) {
    firebase.firestore(this.apps.activeApp).collection('mandants').get()
      .then(snap => snap.docs.map(doc => doc.data()))
      .then(console.log)
  }



}

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
    const isCollection = (options.path.split('/').length % 2 == 1)
    const firestore = firebase.firestore(this.apps.activeApp)

    if (isCollection) {
      let ref = firestore.collection(options.path)

      const query = options.query
        ? eval(options.query)
        : ref

      return query.get()
        .then(snap => snap.docs.map(doc =>
          ({
            id: doc.id,
            data: doc.data()
          })
        ))
    } else {
      return firestore.doc(options.path).get()
        .then(snap =>
          ({
            id: snap.id,
            data: snap.data()
          }))
    }
  }



}

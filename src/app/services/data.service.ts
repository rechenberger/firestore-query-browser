import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material';

@Injectable()
export class DataService {

  constructor(
    private apps: AppsService
  ) {

  }

  private isCollection(path: string = '') {
    return path.split('/').length % 2 === 1
  }

  private snapshotToData(snap) {
    return {
      id: snap.id,
      data: snap.data()
    }
  }

  async get(options: any = {}) {
    return this.ref(options)
      .get()
      .then(docs => this.isCollection(options.path)
        ? docs.docs.map(this.snapshotToData)
        : this.snapshotToData(docs)
      )
  }

  ref(options: any = {}) {
    options.path = options.path || ''
    const firestore = firebase.firestore(this.apps.activeApp)

    if (this.isCollection(options.path)) {
      let ref = firestore.collection(options.path)

      const query = options.query
        ? eval(options.query)
        : ref

      return query
    } else {
      return firestore.doc(options.path)
    }
  }

  async delete(options: any = {}) {
    return this.ref(options)
      .delete()
  }

}

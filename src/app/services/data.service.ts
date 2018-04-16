import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from '@firebase/util'
import { Subject, BehaviorSubject } from 'rxjs'
import { AngularFirestoreDocument } from 'angularfire2/firestore';

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
      data: snap.data(),
      path: snap.ref.path
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


  deletePaths(paths: string[]) {
    const chunks = _.chunk(paths, 20)

    const subject = new BehaviorSubject<number>(0)
    let doneCount = 0

    const doIt = async () => {
      for (const chunk of chunks) {
        await Promise.all(_.map(chunk, path =>
          this.delete({
            path
          })
            .then(() => {
              doneCount++
              subject.next(doneCount)
            })
        ))
      }
    }

    doIt()
      .then(() => subject.complete())

    return subject.asObservable()
  }

  edit(path: string, doc: any, override = false) {
    const firestore = firebase.firestore(this.apps.activeApp)
    const ref = firestore.doc(path)
    const betterDoc = this.dateify(doc)
    if (override) {
      return ref.set(betterDoc)
    } else {
      return ref.update(betterDoc)
    }
  }

  dateify(doc: any) {
    // Date
    if (typeof doc === 'string') {
      const date = Date.parse(doc)
      if (Number.isNaN(date)) {
        return doc
      }
      return new Date(date)
    }

    // Array
    if (Array.isArray(doc)) {
      return _.map(doc, (val, key) => this.dateify(val))
    }

    // Object
    if (typeof doc === 'object') {
      return _.mapValues(doc, (val, key) => this.dateify(val))
    }

    return doc
  }

  editMultiple(paths: string[], doc: any, override = false) {
    const chunks = _.chunk(paths, 20)

    const subject = new BehaviorSubject<number>(0)
    let doneCount = 0

    const doIt = async () => {
      for (const chunk of chunks) {
        await Promise.all(_.map(chunk, path =>
          this.edit(path, doc, override)
            .then(() => {
              doneCount++
              subject.next(doneCount)
            })
        ))
      }
    }

    doIt()
      .then(() => subject.complete())

    return subject.asObservable()

  }

}

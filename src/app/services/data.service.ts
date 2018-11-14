import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from '@firebase/util'
import { Subject, BehaviorSubject } from 'rxjs'
import { AngularFirestoreDocument } from 'angularfire2/firestore'

const DATETIME_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/

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

  protected setWindowResult(result, options) {
    const win = window as any
    const windowResults = this.isCollection(options.path)
      ? _.map(result, item => item.data)
      : result.data
    win.r = windowResults
    win.result = windowResults
  }

  async get(options: any = {}) {
    const result = await this.ref(options)
      .get()
      .then(docs => this.isCollection(options.path)
        ? docs.docs.map(this.snapshotToData)
        : this.snapshotToData(docs)
      )
    this.setWindowResult(result, options)
    return result
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

  singleRef(path) {
    const firestore = firebase.firestore(this.apps.activeApp)
    const ref = firestore.doc(path)
    return ref
  }

  edit(path: string, doc: any, override = false) {
    const ref = this.singleRef(path)
    const betterDoc = this.dateify(doc)
    if (override) {
      return ref.set(betterDoc)
    } else {
      return ref.update(betterDoc)
    }
  }

  dateify(doc: any) {
    // Delete
    if (doc === '__del__') {
      return firebase.firestore.FieldValue.delete()
    }

    // String + Date
    if (typeof doc === 'string') {
      if (!doc.match(DATETIME_REGEX)) {
        return doc
      }
      const date = Date.parse(doc)
      return new Date(date)
    }

    // Null
    if (doc === null) {
      return null
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
            .catch(err => subject.error(err))
        ))
      }
    }

    doIt()
      .then(() => subject.complete())

    return subject.asObservable()

  }

  create(path: string, doc: any) {
    const betterDoc = this.dateify(doc)
    const firestore = firebase.firestore(this.apps.activeApp)
    const collection = firestore.collection(path)
    const id = betterDoc.id
    const docRef = id ? collection.doc(id.toString()) : collection.doc()
    return docRef.set(betterDoc)
  }

  createMultiple(path: string, docs: any[]) {
    const chunks = _.chunk(docs, 20)

    const subject = new BehaviorSubject<number>(0)
    let doneCount = 0

    const doIt = async () => {
      for (const chunk of chunks) {
        await Promise.all(_.map(chunk, doc =>
          this.create(path, doc)
            .then(() => {
              doneCount++
              subject.next(doneCount)
            })
            .catch(err => subject.error(err))
        ))
      }
    }

    doIt()
      .then(() => subject.complete())

    return subject.asObservable()

  }

}

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

  edit(path: string, doc: any) {
    return new Promise(res => {
      setTimeout(() => {
        res()
      }, (1 + Math.random()) * 1000)
    })
    // const firestore = firebase.firestore(this.apps.activeApp)
    // const ref = firestore.doc(path)
    // console.log('ref', ref)

    // TODO: find out why this does not work
    // return ref.update(doc)
  }

  editMultiple(paths: string[], doc: any) {
    const chunks = _.chunk(paths, 20)

    const subject = new BehaviorSubject<number>(0)
    let doneCount = 0

    const doIt = async () => {
      for (const chunk of chunks) {
        await Promise.all(_.map(chunk, path =>
          this.edit(path, doc)
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

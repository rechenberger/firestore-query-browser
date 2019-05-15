import { StorageService } from './storage.service'
import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs'

@Injectable()
export class HistoryService {

  constructor(
    private apps: AppsService,
    private storage: StorageService
  ) { }

  history: Observable<any> = this.getKey()
    .switchMap(key => this.storage.watch<{}[]>(key, []))
    .publishReplay(1)
    .refCount()

  getKey() {
    return this.apps.activeProjectIdChanged
      .asObservable()
      .map(projectId => `history-${projectId}`)
  }

  addEntry(newEntry) {
    Observable.combineLatest([
      this.history,
      this.getKey()
    ])
      .take(1)
      .do(([entries, key]) => {
        const entriesWithoutNewEntry = this.removeEntryFromList(newEntry, entries)
        this.storage.set(key, [newEntry, ...entriesWithoutNewEntry])
      })
      .subscribe(() => null)
  }

  removeEntry(entry) {
    Observable.combineLatest([
      this.history,
      this.getKey()
    ])
      .take(1)
      .do(([entries, key]) => {
        const newEntries = this.removeEntryFromList(entry, entries)
        this.storage.set(key, newEntries)
      })
      .subscribe(() => null)
  }

  removeAllEntries() {
    this.getKey()
      .take(1)
      .do(key => {
        this.storage.set(key, [])
      })
      .subscribe(() => null)
  }

  protected removeEntryFromList(entry, list) {
    return _.filter(list, e => !(e.path === entry.path && e.query === entry.query))
  }

  async getFirstHistoryEntry() {
    const entries = await this.history.take(1).toPromise()
    if (!!entries && !!entries.length) {
      return entries[0]
    } else {
      return null
    }
  }
}

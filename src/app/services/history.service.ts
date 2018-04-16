import { StorageService } from './storage.service'
import { AppsService } from './apps.service'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs';

@Injectable()
export class HistoryService {

  constructor(
    private apps: AppsService,
    private storage: StorageService
  ) { }

  getKey() {
    return this.apps.activeProjectIdChanged
      .asObservable()
      .map(projectId => `history-${projectId}`)
  }

  getHistory() {
    return this.getKey()
      .switchMap(key => this.storage.watch<{}[]>(key, []))
      .publishReplay(1)
      .refCount()
  }

  addEntry(newEntry) {
    Observable.combineLatest([
      this.getHistory(),
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
      this.getHistory(),
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
}

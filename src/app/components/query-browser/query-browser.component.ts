import { MatSnackBar } from '@angular/material';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-query-browser',
  templateUrl: './query-browser.component.html',
  styleUrls: ['./query-browser.component.scss']
})
export class QueryBrowserComponent implements OnInit {

  path = 'mandants'
  query = 'ref'

  queryExamples = [
    {
      query: `ref`,
      label: `No Query`
    },
    {
      query: `ref.where('id', '==', 'test')`,
      label: `Filters by id`
    },
    {
      query: `ref.orderBy('userCount')`,
      label: `orders by userCount`
    },
    {
      query: `ref.limit(2)`,
      label: ``
    }
  ]

  snippets = [
    {
      name: 'where',
      content: `.where('', '', '')`,
    },
    {
      name: 'where ==',
      content: `.where('', '==', '')`,
    },
    {
      name: 'limit',
      content: `.limit()`,
    },
    {
      name: 'orderBy',
      content: `.orderBy('', 'asc')`,
    },
    {
      name: 'startAt',
      content: `.startAt()`,
    },
    {
      name: 'endAt',
      content: `.endAt()`,
    },
    {
      name: 'startAfter',
      content: `.startAfter()`,
    },
    {
      name: 'endAfter',
      content: `.endAfter()`,
    },
  ]

  historyEntries = this.storage.watch<{}[]>('history', [])

  result = Promise.resolve(null)
  loading = false

  constructor(
    private data: DataService,
    private snackbar: MatSnackBar,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.fetchResults({
      addToHistory: false
    })
  }

  fetchResults(options = { addToHistory: true }) {
    const { addToHistory } = options
    this.loading = true
    this.result = this.data.get({
      path: this.path,
      query: this.query
    })
    this.result
      .catch(err => this.snackbar.open(err, 'OK', { duration: 5000 }))
      .then(() => this.loading = false)
    if (addToHistory) {
      this.historyEntries
        .take(1)
        .do(entries => {
          const newEntries = _.filter(entries, entry => !(entry.path === this.path && entry.query === this.query))
          this.storage.set('history', [{ path: this.path, query: this.query }, ...newEntries])
        })
        .subscribe(() => null)
    }
  }

  addSnippet(snippet) {
    this.query += `
  ${snippet.content}`
  }

  setHistoryEntry(entry) {
    this.path = entry.path
    this.query = entry.query
  }

  removeHistoryEntry(entry) {
    this.historyEntries
      .take(1)
      .do(entries => {
        const newEntries = _.filter(entries, e => !(e.path === entry.path && e.query === entry.query))
        this.storage.set('history', newEntries)
      })
      .subscribe(() => null)
  }

}

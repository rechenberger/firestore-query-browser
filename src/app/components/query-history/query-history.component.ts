import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { HistoryService } from '../../services/history.service'

@Component({
  selector: 'app-query-history',
  templateUrl: './query-history.component.html',
  styleUrls: ['./query-history.component.scss']
})
export class QueryHistoryComponent implements OnInit {

  @Input() path
  @Input() query
  @Output() pathChange = new EventEmitter()
  @Output() queryChange = new EventEmitter()
  @Output() fetch = new EventEmitter()


  historyEntries = this.historySrv.getHistory()

  constructor(
    public historySrv: HistoryService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadFirstHistoryEntry()
    }, 0)
  }

  loadFirstHistoryEntry() {
    this.historyEntries
      .take(1)
      .filter(entries => !!entries && !!entries.length)
      .map(entries => entries[0])
      .do(entry => this.setAndFetch(entry))
      .subscribe(() => null)
  }

  setAndFetch(entry) {
    if (entry.path) this.pathChange.emit(entry.path)
    if (entry.query) this.queryChange.emit(entry.query)
    this.fetch.emit()
  }



}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { HistoryService } from '../../services/history.service'
import { QueryService } from '../../services/query.service'

@Component({
  selector: 'app-query-history',
  templateUrl: './query-history.component.html',
  styleUrls: ['./query-history.component.scss']
})
export class QueryHistoryComponent implements OnInit {

  // @Input() path
  // @Input() query
  // @Output() pathChange = new EventEmitter()
  // @Output() queryChange = new EventEmitter()
  @Output() fetch = new EventEmitter()


  historyEntries = this.historySrv.history

  constructor(
    public historySrv: HistoryService,
    private query: QueryService
  ) { }

  ngOnInit() {
  }

  async setAndFetch(entry) {
    await this.query.setFullQuery(entry)
    // if (entry.path) this.pathChange.emit(entry.path)
    // if (entry.query) this.queryChange.emit(entry.query)
    this.fetch.emit()
  }



}

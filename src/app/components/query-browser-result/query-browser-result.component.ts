import { Component, OnChanges, Input } from '@angular/core'
import { AppsService } from '../../services/apps.service'
import { DataService } from '../../services/data.service'
import { DialogService } from '../../services/dialog.service'
import { UtilService } from '../../services/util.service'
import { ExportService } from '../../services/export.service'

@Component({
  selector: 'app-query-browser-result',
  templateUrl: './query-browser-result.component.html',
  styleUrls: ['./query-browser-result.component.scss']
})
export class QueryBrowserResultComponent implements OnChanges {

  @Input() result: any
  @Input() path: string

  entries
  isCollection

  showTable = true

  constructor(
    private apps: AppsService,
    private data: DataService,
    private dialog: DialogService,
    private util: UtilService,
    private exportSrv: ExportService
  ) { }

  ngOnChanges(changes) {
    if (changes.result) {
      this.isCollection = Array.isArray(this.result)
      this.entries = this.isCollection
        ? this.result
        : [this.result]
    }
  }

  exportCsv() {
    this.exportSrv.asCsv(this.path, this.entries)
  }

  exportJson() {
    this.exportSrv.asJson(this.path, this.entries)
  }

}

import { MatSnackBar } from '@angular/material'
import { DataService } from './../../services/data.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import * as _ from 'lodash'
import { DialogService } from '../../services/dialog.service'
import { AppsService } from '../../services/apps.service'
import { HistoryService } from '../../services/history.service'
import { Router } from '@angular/router'
import { EditorComponent } from '../editor/editor.component';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-query-browser',
  templateUrl: './query-browser.component.html',
  styleUrls: ['./query-browser.component.scss']
})
export class QueryBrowserComponent implements OnInit {
  constructor(
    private data: DataService,
    private snackbar: MatSnackBar,
    private storage: StorageService,
    private dialog: DialogService,
    private appsSrv: AppsService,
    private router: Router,
    private historySrv: HistoryService,
    public query: QueryService
  ) { }

  @ViewChild('editor') editor: EditorComponent

  result = Promise.resolve(null)
  loading = false

  ngOnInit() {
    if (!this.appsSrv.activeProjectId) {
      this.router.navigate(['/add'])
      return
    }

    this.fetchResults({
      addToHistory: false
    })
  }

  async fetchResults(options = { addToHistory: true }) {
    const fq = await this.query.fullQuery.take(1).toPromise()

    const { addToHistory } = options
    this.loading = true
    this.result = this.data.get(fq)

    this.result
      .catch(err => this.snackbar.open(err, 'OK', { duration: 5000 }))
      .then(() => this.loading = false)

    if (addToHistory) {
      this.historySrv.addEntry(fq)
    }
  }

  addSnippet(snippet) {
    if (snippet === '__toggleComment__') return this.editor.toggleComment()
    this.editor.addAfterLine('  ' + snippet + '\n')
  }

}

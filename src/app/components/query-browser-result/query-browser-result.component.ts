import { Component, OnChanges, Input } from '@angular/core'
import { AppsService } from '../../services/apps.service';

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

  constructor(
    private apps: AppsService
  ) { }

  ngOnChanges(changes) {
    if (changes.result) {
      this.isCollection = Array.isArray(this.result)
      this.entries = this.isCollection
        ? this.result
        : [this.result]
    }
  }

  gotoConsole(entity) {
    console.log(this.path)
    const parts = this.path.split('/')
    if (this.isCollection) {
      parts.push(entity.id)
    }
    const relativeUrl = parts.join('~2F')
    const url = `https://console.firebase.google.com/project/${this.apps.activeProjectId}/database/firestore/data~2F${relativeUrl}`
    window.open(url)

  }

  delete(entity) {

  }

}

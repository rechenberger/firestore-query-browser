import { Component, OnChanges, Input } from '@angular/core'
import { AppsService } from '../../services/apps.service';
import { DataService } from '../../services/data.service';

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
    private apps: AppsService,
    private data: DataService
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
    const relativeUrl = this.getPathParts(entity).join('~2F')
    const url = `https://console.firebase.google.com/project/${this.apps.activeProjectId}/database/firestore/data~2F${relativeUrl}`
    window.open(url)

  }

  private getPathParts(entity) {
    const parts = this.path.split('/')
    if (this.isCollection) {
      parts.push(entity.id)
    }
    return parts
  }

  delete(entity) {
    return this.data.delete({
      path: this.getPathParts(entity).join('/')
    })
  }

}

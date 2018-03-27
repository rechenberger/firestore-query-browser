import { Component, OnChanges, Input } from '@angular/core'

@Component({
  selector: 'app-query-browser-result',
  templateUrl: './query-browser-result.component.html',
  styleUrls: ['./query-browser-result.component.scss']
})
export class QueryBrowserResultComponent implements OnChanges {

  @Input() result: any
  @Input() path: string

  entries

  constructor() { }

  ngOnChanges(changes) {
    if (changes.result) {
      this.entries = Array.isArray(this.result)
        ? this.result
        : [this.result]
    }
  }

}

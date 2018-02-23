import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-browser',
  templateUrl: './query-browser.component.html',
  styleUrls: ['./query-browser.component.scss']
})
export class QueryBrowserComponent implements OnInit {

  path: string = 'mandants'
  result = Promise.resolve(null)

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.fetchResults()
  }

  fetchResults() {
    this.result = this.data.get({
      path: this.path
    })
  }

}

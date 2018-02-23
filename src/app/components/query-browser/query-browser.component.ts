import { MatSnackBar } from '@angular/material';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-browser',
  templateUrl: './query-browser.component.html',
  styleUrls: ['./query-browser.component.scss']
})
export class QueryBrowserComponent implements OnInit {

  options = {
    path: 'mandants',
    query: `ref`
  }

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
    }
  ]

  result = Promise.resolve(null)
  loading = false

  constructor(
    private data: DataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchResults()
  }

  fetchResults() {
    this.loading = true
    this.result = this.data.get(this.options)
    this.result
      .catch(err => this.snackbar.open(err, 'OK', { duration: 5000 }))
      .then(() => this.loading = false)
  }

}

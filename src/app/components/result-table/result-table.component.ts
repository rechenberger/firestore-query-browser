import { Component, OnChanges, Input, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import * as _ from 'lodash'

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnChanges, AfterViewInit {

  @Input() entries: any[]

  displayedColumns = ['id', 'name', 'progress', 'color']
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  keys

  constructor() { }

  ngOnChanges(changes) {
    if (changes.entries) {
      this.dataSource.data = _.map(this.entries, entry => ({
        ...entry.data,
        ID: entry.id,
        entity: entry
      }))
      this.calcKeys()
    }
  }

  calcKeys() {
    this.keys = _(this.entries)
      .map(entry => _.keys(entry.data))
      .flatten()
      .uniq()
      .value()

    this.displayedColumns = [
      'ID',
      ...this.keys,
      '$actions'
    ]
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue
  }

}

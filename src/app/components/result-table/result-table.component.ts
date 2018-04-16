import { Component, OnChanges, Input, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'

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


  constructor() { }

  ngOnChanges(changes) {
    if (changes.entries) {
      console.log('this.entries', this.entries)
      this.dataSource.data = this.entries
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue
  }

}

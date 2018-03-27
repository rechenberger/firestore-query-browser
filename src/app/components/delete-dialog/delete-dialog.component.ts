import { Component, OnInit, Inject } from '@angular/core'
import { DataService } from '../../services/data.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: any
  ) { }

  results = this.data.get(this.options)
    .then(entries => Array.isArray(entries)
      ? entries
      : [entries]
    )

  doneCount: Observable<number>

  percentage: Observable<number>

  deleting = false
  deleted = false

  ngOnInit() {
    this.initResults()
  }

  async initResults() {

  }

  answer(value) {
    this.dialogRef.close(value)
  }

  doIt() {
    this.deleting = true
    this.doneCount = Observable.from(this.results)
      .map(entries => _.map(entries, e => e.path))
      .switchMap(paths => this.data.deletePaths(paths))
      .publishReplay(1)
      .refCount()

    this.percentage = Observable.combineLatest([this.doneCount, this.results])
      .map(([done, results]) => Math.floor(100 * done / results.length))

    this.doneCount
      .takeLast(1)
      .do(() => this.deleted = true)
      .subscribe(() => null)
  }

}

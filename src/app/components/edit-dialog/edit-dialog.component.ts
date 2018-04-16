import { Component, OnInit, Inject } from '@angular/core'
import { DataService } from '../../services/data.service'
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from 'rxjs'

export interface EditDialogOptions {
  paths: string[]
  template?: any
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: EditDialogOptions,
    private snackbar: MatSnackBar
  ) { }

  newEntity = `{

}`

  loading = false
  done = false

  doneCount
  percentage

  ngOnInit() {
    if (this.options.template) {
      this.newEntity = JSON.stringify(this.options.template, null, '  ')
    }
  }

  doIt() {
    let newEntity
    try {
      newEntity = JSON.parse(this.newEntity)
    } catch (error) {
      this.snackbar.open(error.toString(), 'OK', { duration: 4000 })
      return
    }

    this.loading = true

    this.doneCount = this.data.editMultiple(this.options.paths, newEntity)
      .publishReplay(1)
      .refCount()

    this.percentage = Observable.combineLatest([this.doneCount])
      .map(([done]) => Math.floor(100 * done / this.options.paths.length))

    this.doneCount
      .takeLast(1)
      .do(() => this.done = true)
      .subscribe(() => null)
  }

  answer(value) {
    this.dialogRef.close(value)
  }

}

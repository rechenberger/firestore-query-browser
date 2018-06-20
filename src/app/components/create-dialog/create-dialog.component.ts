import { Component, OnInit, Inject } from '@angular/core'
import { DataService } from '../../services/data.service'
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from 'rxjs'

export interface CreateDialogOptions {
  path: string
}
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: CreateDialogOptions,
    private snackbar: MatSnackBar
  ) { }

  input: ''
  lengthToCreate = 0
  loading = false
  done = false
  doneCount: Observable<number>
  percentage
  error: string

  ngOnInit() {
  }


  doIt() {
    let createDocs
    try {
      createDocs = JSON.parse(this.input)
    } catch (error) {
      this.snackbar.open(error.toString(), 'OK', { duration: 4000 })
      return
    }

    createDocs = Array.isArray(createDocs) ? createDocs : [createDocs]

    this.lengthToCreate = createDocs.length

    if (this.lengthToCreate === 0) return

    this.loading = true

    this.doneCount = this.data.createMultiple(this.options.path, createDocs)
      .publishReplay(1)
      .refCount()

    this.percentage = Observable.combineLatest([this.doneCount])
      .map(([done]) => Math.floor(100 * done / this.lengthToCreate))

    this.doneCount
      .takeLast(1)
      .catch(error => {
        const err = error.toString()
        this.error = err
        this.snackbar.open(err, 'OK', { duration: 4000 })
        return Observable.of(null)
      })
      .finally(() => this.done = true)
      .subscribe(() => null)
  }

  answer(value) {
    this.dialogRef.close(value)
  }

}

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

  ngOnInit() {
  }


  doIt() {
    this.snackbar.open('Not Implemented, yet', 'OK', { duration: 4000 })
  }

  answer(value) {
    this.dialogRef.close(value)
  }

}

import { Component, OnInit, Inject } from '@angular/core'
import { DataService } from '../../services/data.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as _ from 'lodash'
import { Observable } from 'rxjs'

export interface EditDialogOptions {
  ids: string[]
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
    @Inject(MAT_DIALOG_DATA) public options: EditDialogOptions
  ) { }

  newEntity = `{

}`

  loading = false

  ngOnInit() {
  }

  answer(value) {
    this.dialogRef.close(value)
  }

}

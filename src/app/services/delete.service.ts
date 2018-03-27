import { Injectable } from '@angular/core'
import { DataService } from './data.service'
import { MatDialog } from '@angular/material'
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component'
import * as _ from 'lodash'

@Injectable()
export class DeleteService {

  constructor(
    private data: DataService,
    private dialog: MatDialog
  ) { }

  openDialog(options: any = {}) {
    return this.dialog.open(DeleteDialogComponent, { data: options })
      .afterClosed()
  }

}

import { Injectable } from '@angular/core'
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component'
import { MatDialog } from '@angular/material'



@Injectable()
export class EditService {

  openDialog(options: any = {}) {
    return this.dialog.open(EditDialogComponent, { data: options })
      .afterClosed()
  }

  constructor(
    private dialog: MatDialog
  ) { }

}

import { Injectable } from '@angular/core'
import { EditDialogComponent, EditDialogOptions } from '../components/edit-dialog/edit-dialog.component'
import { MatDialog } from '@angular/material'
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { CreateDialogOptions, CreateDialogComponent } from '../components/create-dialog/create-dialog.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  edit(options: EditDialogOptions) {
    return this.dialog.open(EditDialogComponent, { data: options })
      .afterClosed()
  }

  delete(options: any = {}) {
    return this.dialog.open(DeleteDialogComponent, { data: options })
      .afterClosed()
  }

  create(options: CreateDialogOptions) {
    return this.dialog.open(CreateDialogComponent, { data: options })
      .afterClosed()
  }

}

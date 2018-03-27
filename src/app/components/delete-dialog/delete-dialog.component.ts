import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  ngOnInit() {
    this.initResults()
  }

  async initResults() {

  }

  answer(value) {
    this.dialogRef.close(value)
  }

}

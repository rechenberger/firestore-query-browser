import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-query-actions',
  templateUrl: './query-actions.component.html',
  styleUrls: ['./query-actions.component.scss']
})
export class QueryActionsComponent implements OnInit {

  @Input() path
  @Input() query
  @Output() fetch = new EventEmitter()

  constructor(
    private dialog: DialogService,
    private data: DataService
  ) { }

  ngOnInit() {
  }

  async deleteResults() {
    await this.dialog.delete({
      path: this.path,
      query: this.query
    })
      .take(1)
      .toPromise()

    this.fetch.emit()
  }

  async create() {
    await this.dialog.create({
      path: this.path
    })
      .take(1)
      .toPromise()

    this.fetch.emit()
  }

  async editResults() {
    const res = await this.data.get({
      path: this.path,
      query: this.query
    })
    const collection = Array.isArray(res) ? res : [res]

    if (collection.length === 0) return

    const paths = collection.map(doc => doc.path)
    const template = collection[0].data

    await this.dialog.edit({
      template,
      paths
    })
      .take(1)
      .toPromise()

    this.fetch.emit()
  }
}

import { Component, OnInit, Input } from '@angular/core'
import { DataService } from '../../services/data.service'
import { DialogService } from '../../services/dialog.service'
import { UtilService } from '../../services/util.service'

@Component({
  selector: 'app-entry-menu-button',
  templateUrl: './entry-menu-button.component.html',
  styleUrls: ['./entry-menu-button.component.scss']
})
export class EntryMenuButtonComponent implements OnInit {

  @Input() entity

  constructor(
    private data: DataService,
    private dialog: DialogService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  gotoConsole() {
    this.util.gotoConsole(this.entity)
  }

  delete() {
    return this.data.delete({
      path: this.entity.path
    })
  }

  edit() {
    this.dialog.edit({
      paths: [this.entity.path],
      template: this.entity.data
    })
  }

}

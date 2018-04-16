import { Component, OnInit } from '@angular/core'
import { AppsService } from '../../services/apps.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public apps: AppsService
  ) { }

  ngOnInit() {
  }

}

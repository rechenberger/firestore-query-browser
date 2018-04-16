import { AppsService } from './../../services/apps.service';
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit {
  apps

  constructor(
    public appsService: AppsService,
    private snackbar: MatSnackBar
  ) {
    this.reloadApps()
  }

  ngOnInit() {
    this.appsService.activeProjectIdChanged
      .do(() => this.reloadApps())
      .subscribe(() => null)
  }

  reloadApps() {
    this.apps = this.appsService.apps()
  }

  pick(projectId) {
    this.appsService.activeProjectId = projectId
  }

}

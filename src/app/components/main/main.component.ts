import { AuthService } from './../../services/auth.service'
import { AppsService } from './../../services/apps.service'
import { Component, OnInit } from '@angular/core'
import { GoogleAnalyticsService } from '../../services/google-analytics.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public apps: AppsService,
    public auth: AuthService,
    public ga: GoogleAnalyticsService
  ) { }

  ngOnInit() {
  }

}

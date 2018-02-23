import { AppsService } from './../../services/apps.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public apps: AppsService
  ) { }

  ngOnInit() {
  }

}

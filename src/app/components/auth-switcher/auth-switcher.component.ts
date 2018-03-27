import { Component, OnInit } from '@angular/core'
import { AuthSwitcherService } from '../../services/auth-switcher.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-auth-switcher',
  templateUrl: './auth-switcher.component.html',
  styleUrls: ['./auth-switcher.component.scss']
})
export class AuthSwitcherComponent implements OnInit {

  constructor(
    public authSwitcher: AuthSwitcherService
  ) { }

  users = this.authSwitcher.watchUsers()
    .map(users => _.map(users))

  activeUser

  ngOnInit() {
  }

  switchUser(email) {
    this.users
      .take(1)
      .map(users => _.find(users, user => user.email === email))
      .do(user => this.authSwitcher.switchUser(user))
      .subscribe()
  }

}

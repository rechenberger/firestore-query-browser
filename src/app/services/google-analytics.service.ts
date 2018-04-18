import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { NavigationEnd, Router } from '@angular/router'

declare let window: any
declare let dataLayer: any
declare let ga: any

@Injectable()
export class GoogleAnalyticsService {

  constructor(
    private router: Router
  ) {
    if (!environment.production) return
    if (!environment.googleAnalytics.active) return

    window.dataLayer = window.dataLayer || []

    function gtag(...args: any[]) {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', environment.googleAnalytics.id)

    this.router.events
      .do(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', environment.googleAnalytics.id, { 'page_path': event.url })
        }
      })
      .subscribe(() => null)
  }
}

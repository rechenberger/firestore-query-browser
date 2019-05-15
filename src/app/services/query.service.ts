import { Router, ActivatedRoute } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import 'rxjs-compat/add/operator/startWith'
import { HistoryService } from './history.service'

export interface FullQuery {
  path: string
  query: string
}

const defaultFullQuery = {
  path: 'dinosaurs',
  query: 'ref'
} as FullQuery

@Injectable()
export class QueryService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private history: HistoryService
  ) {

    this.fullQuery
      .do(fq => this.fullQueryCached = fq)
      .do((fq) => console.log('fq', fq))
      .subscribe()

    this.route.queryParams
      .do((queryParams) => console.log('queryParams', queryParams))
      .subscribe()

    this.initFirstHistory()
  }

  private fullQueryDefault = new BehaviorSubject(_.clone(defaultFullQuery))
  private fullQueryCached = _.clone(defaultFullQuery)

  private fullQueryByRoute = this.route.queryParams
    .map(params => ({
      path: params.path,
      query: params.query
    } as FullQuery))

  private fullQueryByRouteFiltered = this.fullQueryByRoute
    .filter(fq => this.isFullQueryValid(fq))
    .do((filtered) => console.log('filtered', filtered))

  fullQuery = this.fullQueryDefault
    .take(1)
    .concat(this.fullQueryByRouteFiltered)
    .publishReplay(1)
    .refCount()

  async initFirstHistory() {
    const firstHistoryEntry = await this.history.getFirstHistoryEntry()
    if (!firstHistoryEntry) return
    const fqByRoute = await this.fullQueryByRoute.take(1).toPromise()
    if (!this.isFullQueryValid(fqByRoute)) {
      await this.setFullQuery(firstHistoryEntry)
    }
  }


  async setFullQuery(fq: FullQuery) {
    this.fullQueryCached = fq
    const queryParams = fq
    this.router.navigate([], { relativeTo: this.route, queryParams })
  }

  async setPath(path: string) {
    const fq = this.fullQueryCached
    await this.setFullQuery({
      ...fq,
      path
    })
  }

  async setQuery(query: string) {
    const fq = this.fullQueryCached
    await this.setFullQuery({
      ...fq,
      query
    })
  }

  isFullQueryValid(fq: Partial<FullQuery>) {
    return !!fq && !!fq.path && !!fq.query
  }


}

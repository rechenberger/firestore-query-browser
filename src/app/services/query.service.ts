import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'

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

  constructor() {

    this.fullQuery
      .do(fq => this.fullQueryCached = fq)
      .subscribe()
  }

  fullQuery = new BehaviorSubject(_.clone(defaultFullQuery))
  private fullQueryCached

  setFullQuery(fq: FullQuery) {
    this.fullQuery.next(fq)
  }

  async setPath(path: string) {
    const fq = this.fullQueryCached
    this.setFullQuery({
      ...fq,
      path
    })
  }

  async setQuery(query: string) {
    const fq = this.fullQueryCached
    this.setFullQuery({
      ...fq,
      query
    })
  }


}

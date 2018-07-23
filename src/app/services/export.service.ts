import { Injectable } from '@angular/core'
import { unparse } from 'papaparse'
import * as _ from 'lodash'
import * as dotize from 'dotize'

@Injectable()
export class ExportService {

  constructor() { }

  download(filename, text) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  asCsv(path: string, entries: any[]) {
    const filename = path.split('/').pop()
    const doc = _.map(entries, entry => dotize.convert(entry.data))
    const csv = unparse(doc)
    this.download(`${filename}.csv`, csv)
  }

}

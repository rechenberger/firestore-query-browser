import { Injectable } from '@angular/core'
import { unparse } from 'papaparse'
import * as _ from 'lodash'

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
    const csv = unparse(_.map(entries, entry => entry.data))
    this.download(`${filename}.csv`, csv)
  }

}

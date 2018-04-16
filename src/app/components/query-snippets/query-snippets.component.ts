import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-query-snippets',
  templateUrl: './query-snippets.component.html',
  styleUrls: ['./query-snippets.component.scss']
})
export class QuerySnippetsComponent implements OnInit {

  @Input() query
  @Output() queryChange = new EventEmitter()

  snippets = [
    {
      name: 'where',
      content: `.where('', '', '')`,
    },
    {
      name: 'where ==',
      content: `.where('', '==', '')`,
    },
    {
      name: 'limit',
      content: `.limit()`,
    },
    {
      name: 'orderBy',
      content: `.orderBy('', 'asc')`,
    },
    {
      name: 'startAt',
      content: `.startAt()`,
    },
    {
      name: 'endAt',
      content: `.endAt()`,
    },
    {
      name: 'startAfter',
      content: `.startAfter()`,
    },
    {
      name: 'endAfter',
      content: `.endAfter()`,
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  addSnippet(snippet) {
    const query = this.query + `
  ${snippet.content}`
    this.queryChange.emit(query)
  }

}

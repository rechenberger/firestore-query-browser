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
      more: true
    },
    {
      name: 'endAt',
      content: `.endAt()`,
      more: true
    },
    {
      name: 'startAfter',
      content: `.startAfter()`,
      more: true
    },
    {
      name: 'endAfter',
      content: `.endAfter()`,
      more: true
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

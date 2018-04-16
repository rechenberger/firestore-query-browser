import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-query-snippets',
  templateUrl: './query-snippets.component.html',
  styleUrls: ['./query-snippets.component.scss']
})
export class QuerySnippetsComponent implements OnInit {

  @Output() addSnippet = new EventEmitter()

  snippets = [
    {
      name: 'where',
      content: `.where('#{prop}', '==', '#{val}')`,
    },
    {
      name: 'limit',
      content: `.limit(#{limit})`,
    },
    {
      name: 'orderBy',
      content: `.orderBy('#{prop}', '#{direction}')`,
    },
    {
      name: '//',
      content: `__toggleComment__`,
    },
    {
      name: 'startAt',
      content: `.startAt(#{pos})`,
      more: true
    },
    {
      name: 'endAt',
      content: `.endAt(#{pos})`,
      more: true
    },
    {
      name: 'startAfter',
      content: `.startAfter(#{pos})`,
      more: true
    },
    {
      name: 'endAfter',
      content: `.endAfter(#{pos})`,
      more: true
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}

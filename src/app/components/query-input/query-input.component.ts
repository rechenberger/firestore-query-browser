import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.scss']
})
export class QueryInputComponent implements OnInit {

  @Input() path
  @Input() query

  @Output() pathChange = new EventEmitter()
  @Output() queryChange = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

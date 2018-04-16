import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }

  @ViewChild('editor') editor: ElementRef

  @Input() query
  @Output() queryChange = new EventEmitter()
  snippetRegex = /#\{([^#.]*)\}/

  ngOnInit() {

  }

  add(text: string, pos = this.getCursorPos()) {
    let val = this.query
    const splitVal = val.split('')
    if (pos >= splitVal.length) {
      splitVal.push(text)
    } else {
      splitVal[pos] = `${text}${splitVal[pos]}`
    }
    val = splitVal.join('')
    this.query = val
    this.editor.nativeElement.focus()

    if (this.snippetInQuery) return this.selectNextSnippet(pos)
    const newCursorPos = pos + text.length
    this.setCursorPos(newCursorPos)
  }

  indentedAdd(text) {
    const pos = this.getCursorPos()
    const isNewLine = pos === 0 ? true : this.query[pos - 1] === '\n'
    const newText = isNewLine ? '  ' + text : text
    this.add(newText)
  }

  tab(event) {
    event.preventDefault()
    if (this.snippetInQuery()) return this.selectNextSnippet()
    this.add('  ')
  }

  toggleComment() {
    const pos = this.getCursorPos()
    const text: string = this.query.substr(0, pos)
    const posAfterNewLine = text.lastIndexOf('\n') + 1
    if (this.query.substr(posAfterNewLine, 2) === '//') {
      this.query = this.query.substr(0, posAfterNewLine) + this.query.substr(posAfterNewLine + 2)
      this.setCursorPos(pos)
      return
    }
    this.add('//', posAfterNewLine)
  }

  protected getCursorPos() {
    return this.editor.nativeElement.selectionStart
  }

  protected setCursorPos(pos) {
    setTimeout(() => {
      this.editor.nativeElement.selectionStart = pos
      this.editor.nativeElement.selectionEnd = pos
    }, 0)
  }

  protected snippetInQuery() {
    return !!this.query.match(this.snippetRegex)
  }

  protected selectNextSnippet(defaultPos = null) {
    const pos = this.getNextSnippetPos(defaultPos)
    this.selectText(pos)
  }

  protected getNextSnippetPos(pos = this.getCursorPos()) {
    const upcomingText = this.query.substr(pos)
    const found = upcomingText.match(this.snippetRegex)
    if (!found) return pos === 0 ? null : this.getNextSnippetPos(0)
    return {
      start: pos + found.index,
      end: pos + found.index + found[0].length
    }
  }

  protected selectText(pos?: { start: number, end: number }) {
    if (!pos) return
    const { start, end } = pos
    this.editor.nativeElement.selectionStart = start
    this.editor.nativeElement.selectionEnd = end
  }
}

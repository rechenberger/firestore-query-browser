import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }

  @ViewChild('editor') editor: ElementRef

  query = `ref
  `
  snippetRegex = /#\{([^#.]*)\}/

  ngOnInit() {

  }

  add(text: string) {
    const pos = this.getCursorPos()
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

    setTimeout(() => {
      if (this.snippetInQuery) return this.selectNextSnippet(pos)
      const newCursorPos = pos + text.length
      this.setCursorPos(newCursorPos)
    }, 0)
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

  protected getCursorPos() {
    return this.editor.nativeElement.selectionStart
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
    console.log('pos', pos)
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

  protected setCursorPos(pos) {
    this.editor.nativeElement.selectionStart = pos
    this.editor.nativeElement.selectionEnd = pos
  }
}

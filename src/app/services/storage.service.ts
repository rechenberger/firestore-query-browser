import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class StorageService {
  storage = window.localStorage
  subjects = {}

  constructor(
  ) { }

  get<T>(key, defaultValue = null): T {
    const value = localStorage.getItem(this.getKey(key))
    if (value === null) {
      return defaultValue
    }

    let res
    try {
      res = JSON.parse(value)
    } catch (e) {
      res = value
    }
    return res
  }

  watch<T>(key, defaultValue = null): BehaviorSubject<T> {
    if (this.subjects[key]) {
      return this.subjects[key]
    }

    const value = this.get<T>(key, defaultValue)
    const subject = new BehaviorSubject<T>(value)
    this.subjects[key] = subject
    return subject
  }

  set(key, value) {
    const isString = typeof value === 'string'
    const newValue = isString
      ? value
      : JSON.stringify(value)
    localStorage.setItem(this.getKey(key), newValue)
    this.subjects[key].next(value)
    return value
  }

  remove(key) {
    return localStorage.removeItem(this.getKey(key))
  }

  getKey(key) {
    return `query-browser-${key}`
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() { }

  set(key, value) {
    window.sessionStorage[key] = value;
    return this;
  }

  get(key, defaultValue = null) {
    return window.sessionStorage[key] || defaultValue;
  }

  setObject(key, value: Object) {
    window.sessionStorage[key] = JSON.stringify(value);
    return this;
  }

  getObject(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  remove(key) {
    window.sessionStorage.removeItem(key);
    return this;
  }

  clear() {
    window.sessionStorage.clear();
    return this;
  }
}

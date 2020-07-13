import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const TOKEN_KEY = 'token';
const TOKEN_REFRESH_KEY = 'token_refresh';
const TOKENPAYPAL_KEY = 'tokenPayPal';

@Injectable()
export class JwtTokenService {
  constructor(private localStorage: LocalStorageService) { }

  get token() {
    return this.localStorage.get(TOKEN_KEY);
  }

  set token(value) {
    value
      ? this.localStorage.set(TOKEN_KEY, '' + value)
      : this.localStorage.remove(TOKEN_KEY);
  }

  get refresh_token() {
    return this.localStorage.get(TOKEN_REFRESH_KEY);
  }

  set refresh_token(value) {
    value
      ? this.localStorage.set(TOKEN_REFRESH_KEY, value)
      : this.localStorage.remove(TOKEN_REFRESH_KEY);
  }

  get tokenPayPal() {
    return this.localStorage.get(TOKENPAYPAL_KEY);
  }

  set tokenPayPal(value) {
    value
      ? this.localStorage.set(TOKENPAYPAL_KEY, value)
      : this.localStorage.remove(TOKENPAYPAL_KEY);
  }
}

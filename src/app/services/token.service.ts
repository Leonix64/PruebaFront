import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'authToken';

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
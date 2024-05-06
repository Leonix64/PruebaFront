import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  LoginUser(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const registerUrl = `${this.apiUrl}/login`;

    return this.http.post(registerUrl, loginData, { headers });
  }
}

export interface LoginData {
  name: string;
  password: string;
}
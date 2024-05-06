import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(userData: UserData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const registerUrl = `${this.apiUrl}/registro`;

    return this.http.post(registerUrl, userData, { headers });
  }
}

export interface UserData {
  name: string;
  last_name: string;
  age: number;
  phone: string;
  sex: string;
  password: string;
}
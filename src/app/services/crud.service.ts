import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Conexion al API de Crear 
  createUser(userData: UserData, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const createUrl = `${this.apiUrl}/create`;

    return this.http.post(createUrl, userData, { headers });
  }

  // Conexion al API de Read
  getUploads(token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const readUrl = `${this.apiUrl}/read`;

    return this.http.get(readUrl, { headers });
  }

  // Conexión al API de Actualizar
  updateUpload(uploadId: string, userData: UserData, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const updateUrl = `${this.apiUrl}/update/${uploadId}`;

    return this.http.put(updateUrl, userData, { headers });
  }

  // Conexión al API de Delete
  deleteUpload(uploadId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const deleteUrl = `${this.apiUrl}/delete/${uploadId}`;

    return this.http.delete(deleteUrl, { headers });
  }
}

export interface UserData {
  title: string,
  description: string,
  image: string,
}

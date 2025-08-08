import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:8000/api'; // Ajusta la URL base según tu configuración
  // private apiUrl = 'http://skinnatech-back.test/api'; // Ajusta la URL base según tu configuración
  private apiUrl = environment.apiUrl; // Ajusta la URL base según tu 

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  showUser(userId: string|null): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: string|null, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }

  deleteUser(userId: string|null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}

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
}

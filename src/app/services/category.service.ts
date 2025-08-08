import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl; // Ajusta la URL base según tu 

  constructor(private http: HttpClient) { }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category`, categoryData);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category`);
  }

  showCategory(categoryId: string|null): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }

  updateCategory(categoryId: string|null, categoryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/category/${categoryId}`, categoryData);
  }

  deleteCategory(categoryId: string|null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/category/${categoryId}`);
  }
}

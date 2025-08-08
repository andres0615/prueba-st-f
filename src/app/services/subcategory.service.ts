import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiUrl = environment.apiUrl; // Ajusta la URL base según tu 

  constructor(private http: HttpClient) { }

  createSubcategory(subcategoryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/subcategory`, subcategoryData);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategory`);
  }

  showSubcategory(subcategoryId: string|null): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategory/${subcategoryId}`);
  }

  updateSubcategory(subcategoryId: string|null, subcategoryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/subcategory/${subcategoryId}`, subcategoryData);
  }

  deleteSubcategory(subcategoryId: string|null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subcategory/${subcategoryId}`);
  }
}

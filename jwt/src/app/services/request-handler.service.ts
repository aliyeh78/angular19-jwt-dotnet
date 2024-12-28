import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',  // Make this service globally available
})
export class RequestHandlerService {
  constructor(private http: HttpClient) {}

  // Method to get the JWT token from localStorage
   getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to make a GET request
  get<T>(url: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${environment.url}/${url}`, { headers });
  }

  // Method to make a POST request
  post<T>(url: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${environment.url}/${url}`, body, { headers });
  }

  // Method to create headers, including the Authorization header if the token is available
  private createHeaders() {
    const token = this.getAuthToken();
    const headers: { [key: string]: string } = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }
}

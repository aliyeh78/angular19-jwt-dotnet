import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.example.com/login';  // Replace with your actual API endpoint

  constructor(private http: HttpClient, private apiService:RequestHandlerService) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.apiService.post(this.apiUrl, { username, password });
  }

  // Method to get the token (assuming it's stored in localStorage)
  getToken(): string | null {
    console.log("Getting token")
    return localStorage.getItem('token')?localStorage.getItem('token'):'';
  }

  // Optionally, you could also add a logout method that removes the token
  logout(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now(); // Check token expiry
    }
    return false;
  }
}

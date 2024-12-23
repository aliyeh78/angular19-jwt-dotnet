// jwt.service.ts

import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Method to decode and get claims from a JWT
  decodeToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Method to check if a JWT is expired
  isTokenExpired(token: string) {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return true; // Token is invalid or cannot be decoded
    }
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if(expirationTime)
    return expirationTime < currentTime;
  else{
    return ''
  }
  }

  // Store token in local storage
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get token from local storage
  getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  // Remove token from local storage
  removeToken() {
    localStorage.removeItem('token');
  }
}

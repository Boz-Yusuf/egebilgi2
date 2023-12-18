import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }
  
  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    try {
      return localStorage.getItem('access_token')!;
    } catch (error) {
      const errorMessage = 'access token couldn\'t find';
      throw new Error(errorMessage);
    }
    
  }

  deleteAccessToken() {
    try {
      localStorage.removeItem('access_token');
    } catch (error) {
      const errorMessage = 'access token couldn\'t find';
      throw new Error(errorMessage);
    }
  }
}

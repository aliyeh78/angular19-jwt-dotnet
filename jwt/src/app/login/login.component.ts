// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input type="text" placeholder="Username" [(ngModel)]="username">
      <input type="password" placeholder="Password" [(ngModel)]="password">
      <button type="submit">Login</button>
    </form>
  `,
  standalone: true,
  imports: [   CommonModule  ,FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private jwtService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    // Simulate login request (replace with actual API call)
    const mockLoginResponse = {
      token: 'your_actual_jwt_token_here'
    };

    if (this.username === 'validUser' && this.password === 'validPassword') {
      // Store the received token
      this.jwtService.storeToken(mockLoginResponse.token);
      // Redirect to another component or page after successful login
      // (e.g., using a Router)
    } else {
      // Handle login error (e.g., display an error message)
      console.error('Invalid credentials');
    }
  }
}

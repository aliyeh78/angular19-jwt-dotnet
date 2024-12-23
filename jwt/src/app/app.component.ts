import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; // Import the LoginComponent

@Component({

imports: [LoginComponent],
  selector: 'app-root',
  standalone: true,  // Make it standalone
  template: `<h1>Welcome to Angular!</h1>
  <app-login></app-login>`,
})
export class AppComponent {}

import { Component, HostListener, OnInit, Renderer2,PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHandlerService } from '../services/request-handler.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule],
  providers: [
    // Provide JwtInterceptor if needed (as a global provider)
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent  implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginForm!: FormGroup;
  flashlightElement: HTMLElement | null = null;

  constructor(
    private requestHandlerService: RequestHandlerService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initForm()
  }
  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // This block will only run in the browser
      const cursor = document.getElementById('flashlight');
      if (cursor) {
        window.addEventListener('mousemove', (e) => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        });
      }
    }
}



  onSubmit(): void {
    const credentials = { username: this.username, password: this.password };
    this.requestHandlerService.post<any>('auth/login', credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Store the token if login is successful
        localStorage.setItem('token', response.token);
        // Redirect to dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed', error);
      }
    );
  }




  initForm(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    document.addEventListener('mousemove', (event) => {
      const flashlight = document.querySelector('.flashlight-mask') as HTMLElement;

      if (flashlight) {
        // Update the background position based on mouse movement
        flashlight.style.backgroundPosition = `${event.pageX}px ${event.pageY}px`;
      }
    });
  }
}

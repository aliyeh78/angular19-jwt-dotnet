import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Your AuthService that provides the token

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.authService.getToken(); // Make sure this function returns the token

    // if (token) {
    //   const clonedReq = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   return next.handle(clonedReq);
    // }

    return next.handle(req);
  }
}

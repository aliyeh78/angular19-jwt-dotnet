import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private requestHandlerService: RequestHandlerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from the RequestHandlerService
    const token = this.requestHandlerService.getAuthToken();

    // If a token is available, clone the request and add the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continue with the request
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('jwt');

    let authRequest = request;

    if(token) {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    
    return next
    .handle(authRequest)
    .pipe(
      catchError((error: any) => {
        console.log(error)
        if(error instanceof HttpErrorResponse && error.status == 401) {
          return this.handle401Error(authRequest, next);
        }
        if(error instanceof HttpErrorResponse && error.status == 403) {
          sessionStorage.clear();
          this.router.navigateByUrl('perfil/login');
        }

        return throwError(error);
      })
    )
    .pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        return evt;
      })
    );
  }

  handle401Error(authRequest: HttpRequest<unknown>, next: HttpHandler) {
    const refreshToken = sessionStorage.getItem('refreshToken');

    return this.auth.refreshToken({refreshToken: refreshToken}).pipe(
      switchMap((value: any) => {
        sessionStorage.setItem('jwt', value.accessToken);
        return next.handle(
          authRequest.clone({
            headers: authRequest.headers.set('Authorization', 'Bearer ' + value.accessToken)
          })
        )
      }),
      catchError(error => {
        sessionStorage.clear();
        this.router.navigateByUrl('perfil/login');
        return throwError(new Error('Su session ha caducado'));
      })
    )
  }

}

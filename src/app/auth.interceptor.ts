import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, LoaderService } from '@@servicios';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private auth: AuthService,
    private _loader: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('jwt');
    const refreshToken = sessionStorage.getItem('refreshToken');

    let authRequest = request;

    this._loader.setLoading(true, request.url);

    if(token) {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token).append('Refresh',refreshToken || '')
      });
    }
    
    return next
    .handle(authRequest)
    .pipe(
      catchError((error: any) => {
        // console.log(error)
        if(error instanceof HttpErrorResponse && error.status == 401) {
          return this.handle401Error(authRequest, next);
        }
        if(error instanceof HttpErrorResponse && error.status == 403) {
          sessionStorage.clear();
          this.router.navigateByUrl('perfil/login');
        }
        this._loader.setLoading(false, request.url);
        return throwError(() => error);
      })
    )
    .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this._loader.setLoading(false, request.url);
      }
      return evt;
    }));
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
        this._loader.setLoading(false, authRequest.url);
        this.router.navigateByUrl('perfil/login');
        return throwError(() => new Error('Su session ha caducado'));
      })
    )
  }

}

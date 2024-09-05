import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environmet } from '../environments/environemt.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    usuarios$!: Observable<any[]>;

  constructor(
    private http: HttpClient,
  ) { }

  login(payload: any) {
    return this.http.post(environmet.API+'auth/login', payload);
  }

  updatePerfil(payload: any) {
    return this.http.post(environmet.API+'actualiza/datos', payload);
  }

  insertPerfil(payload: any) {
    return this.http.post(environmet.API+'actualiza/perfil', payload);
  }

  findPerfil() {

    if(!this.usuarios$) {
      this.usuarios$ = this.http.post<any[]>(environmet.API+'consulta/usuarios', {})
      .pipe(shareReplay(1));
    }

    return this.usuarios$;
  } 

  refreshToken(payload: any) {
    return this.http.post(environmet.API + 'auth/refreshtoken', payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmet } from 'src/environments/environemt.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    return this.http.post(environmet.API+'consulta/usuarios', {});
  } 
}

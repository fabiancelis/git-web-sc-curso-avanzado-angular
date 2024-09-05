import { Usuario } from '@@dominio';
import { AuthService } from '@@servicios';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  onLogin() {
    let payload = {
      usuario: this.usuario
    }
    this.auth.login(payload).subscribe({
        next: (value: any) => {
          if(value['codigo']==0) {
            sessionStorage.setItem('jwt', value['jwt']);
            sessionStorage.setItem('refreshToken', value['refreshToken']);
            sessionStorage.setItem('perfil', JSON.stringify(value['perfil']));
            //TODO: obtener la ruta de la respuesta del servicio
            this.router.navigateByUrl('perfil');
          }
          else {
            this.toastr.warning(value['mensaje'])
          }
      },
    })
  }

}

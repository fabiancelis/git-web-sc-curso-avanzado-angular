import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dominio/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  constructor(
    private auth: AuthService,
    private router: Router
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
            this.router.navigateByUrl('perfil');
          }
          else {
            
          }
      },
    })
  }

}

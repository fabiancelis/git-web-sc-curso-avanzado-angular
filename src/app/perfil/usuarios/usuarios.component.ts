import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/dominio/perfil';
import { AuthService } from 'src/app/servicios/auth.service';

const SCHEMA_TABLE = [
  {
    key: 'nombre_completo',
    label: 'Nombre Completo'
  },
  {
    key: 'codigo_usuario',
    label: 'Codigo de Usuario'
  }
  ,
  {
    key: 'nacionalidad',
    label: 'Nacionalidad'
  }
  ,
  {
    key: 'cedula',
    label: 'Cédula'
  }
  ,
  {
    key: 'correo_electronico',
    label: 'Correo electrónico'
  }
  ,
  {
    key: 'edad',
    label: 'Edad'
  },
  {
    key: 'editar',
    label: 'Editar'
  }
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumnsHeaders: any;
  displayedColumns: any;
  usuario: any;

  columnSchema = SCHEMA_TABLE;

  dataSource: any[] = [];

  jwt: string = '';

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private jwtService: JwtHelperService,
    private router: Router
  ){
    this.jwt = sessionStorage.getItem('jwt') || '';
  }


  ngOnInit(): void {
    this.displayedColumnsHeaders = SCHEMA_TABLE.map(x => x.key);
    this.displayedColumns = SCHEMA_TABLE.map(x => x.key);
   this.usuario = JSON.parse(sessionStorage.getItem('perfil') || '{}');
  }

  cargarPefil() {

    // if(this.jwtService.isTokenExpired(this.jwt)) {
    //   sessionStorage.clear();
    //   this.router.navigateByUrl('perfil/login');
    //   this.toastr.warning('Su sesion ha caducado');
    // } 
    // else {
      this.auth.findPerfil().subscribe({
        next:(value) => {
          
          JSON.parse(value.toString()).map((x: any )=> {
            this.dataSource.push(x);
          });
  
          this.displayedColumns = this.displayedColumns.filter((e: any) => {
            if(this.usuario.permisos.find((x: any) => x.id == 10) != undefined) {
              return e != 'editar';
            }
            return true;
          });
  
          this.dataSource = [...this.dataSource];
        },
        error: (err) => {
          this.toastr.warning(err.message);
        },
      })
    // }
    
  }

  onEdit(value: any) {
    console.log(value)
    let editado = value == undefined || false ? true : !value;
    this.dataSource = [...this.dataSource];
    return editado;
  }

  onGuardar(){
    console.log(this.dataSource);
  }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(
    private auth: AuthService
  ){}


  ngOnInit(): void {
    this.displayedColumnsHeaders = SCHEMA_TABLE.map(x => x.key);
    this.displayedColumns = SCHEMA_TABLE.map(x => x.key);
   this.usuario = JSON.parse(sessionStorage.getItem('perfil') || '{}');
  }

  cargarPefil() {
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
    })
    
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

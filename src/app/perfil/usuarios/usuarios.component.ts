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
  }
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumnsHeaders = SCHEMA_TABLE.map(x => x.key);
  displayedColumns = SCHEMA_TABLE.map(x => x.key);

  columnSchema = SCHEMA_TABLE;

  dataSource: any[] = [];

  constructor(
    private auth: AuthService
  ){}


  ngOnInit(): void {
    
  }

  cargarPefil() {
    this.auth.findPerfil().subscribe({
      next:(value) => {
        
        JSON.parse(value.toString()).map((x: any )=> {
          this.dataSource.push(x);
        })
        
        this.dataSource = [...this.dataSource];
      },
    })
    
  }

}

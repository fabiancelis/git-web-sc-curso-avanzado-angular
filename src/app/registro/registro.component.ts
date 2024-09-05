import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { Perfil } from '@@dominio';
import { AuthService } from '@@servicios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  permisos!: Observable<any[]>;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService
  ){}
  
  rePasswordMatcher = new passwordErrorStateMatcher();

  ngOnInit(): void {
    this.permisos = of(
      [
          {
            id: 1,
            title: 'Perfil',
            cod_cargo: ['52036']
          },
          {
            id: 2,
            title: 'Usuarios',
            cod_cargo: ['52036', '25145']
          },
          {
            id: 3,
            title: 'Permisos',
            cod_cargo: ['52036', '32589', '25145']
          }
        ]
    );
  }

  codigos: any[] = [
    {
      cod: '52036',
      Title: 'Gerente'
    },
    {
      cod: '32589',
      title: 'analista'
    },
    {
      cod: '25145',
      title: 'Cordinador'
    }
  ];

  seleccionado: any;
  seleccionados: any[] = [];

  formRegistro = new FormGroup({
    nombre_completo: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('')
  });

  onPermiso() {
    this.seleccionados.unshift(this.seleccionado);
    this.seleccionados = [...this.seleccionados];
  }

  onRemove(item: any) {
    this.seleccionados.splice(this.seleccionados.indexOf(item), 1);
    this.seleccionados = [...this.seleccionados];
  }

  onSubmit() {
    console.log(this.formRegistro.valid)
    if(this.formRegistro.valid) {

      let usuario = {
        perfil: Object.assign(this.formRegistro.value, {
          permisos: this.seleccionados
        }),
      };

      this.auth.insertPerfil(usuario).subscribe({
        next: (value: any) => {
          this.toastr.success('Usiario guardado exitosamente')
        },
      })
    }
  }

  show(value: string) {
    alert(value);
  }
}

export class passwordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    let isError = control?.value !== form?.form.controls['password'].value;
    if(isError) form?.form.setErrors({'invalid': true});
    return isError;
  }
  
}

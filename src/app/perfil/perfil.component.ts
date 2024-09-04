import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Perfil } from '../dominio/perfil';
import Swal from 'sweetalert2';
import { AuthService } from '../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private toastr: ToastrService
  ){}

  modificado: boolean = false;

    perfil: Perfil = new Perfil();

    perfilForm = new FormGroup({
      nombre_completo: new FormControl('', [Validators.required]),
      nombre_completo_label: new FormControl(),
      nombre_completo_modify: new FormControl(false),
      codigo_usuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
      codigo_usuario_label: new FormControl(),
      codigo_usuario_modify: new FormControl(false),
      nacionalidad:  new FormControl('', [Validators.required]),
      nacionalidad_label: new FormControl(),
      nacionalidad_modify: new FormControl(false),
      cedula: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cedula_label: new FormControl(),
      cedula_modify: new FormControl(false),
      correo_electronico:  new FormControl('', [Validators.required, Validators.email]),
      correo_electronico_label: new FormControl(),
      correo_electronico_modify: new FormControl(false),
      edad: new FormControl(),
      edad_label: new FormControl(),
      edad_modify: new FormControl(false),
    });

    ngOnInit(): void {
      this.perfil = JSON.parse(sessionStorage.getItem('perfil') || '{}') as Perfil;
      this.perfilForm.patchValue(this.perfil);
    }

    onSubmit() {
      if(this.perfilForm.valid) {
        
        // Se obtiene un arreglo los nombres de los atributos del objeto perfil
        Object.keys(this.perfilForm.value).filter(key => !key.includes('label') && !key.includes('modify')).forEach( key => {
          
          if(this.perfilForm.value[key as keyof Perfil] != this.perfil[key as keyof Perfil]){
            this.perfilForm.value[(key+'_modify') as keyof Perfil] = true;
          }
        
        });
        
        const resultado = Object.assign(this.perfil, this.perfilForm.value);
        // console.log(resultado, Object.keys(resultado).filter(entry => entry.includes('modify')))
        
        this.modificado = Object.entries(resultado)
       .filter((entry) => entry[0].includes('modify') && entry[1]).length > 0;


        if(this.modificado) {
          Swal.fire({
            title: 'Esta seguro que desea guardar los cambios?',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
          }).then(x => {
            console.log(x)
            if(x.isConfirmed) {

              console.log(resultado)

              resultado['permisos' as keyof Perfil] = undefined;

              this.auth.updatePerfil(resultado).subscribe({
                next: (value) => {
                  console.log(value);
                  Object.keys(resultado).filter(key => key.includes('modify')).forEach( key => {
                    resultado[key as keyof Perfil] = false;
                  });
                  sessionStorage.setItem('perfil', JSON.stringify(resultado));
                  this.perfilForm.patchValue(resultado);
                  this.toastr.success('Cambios guardados');
                }
              })
            }
          })

       }


      }
      else {
        Swal.fire({
          title: 'Posee errores en el formulario',
          icon: 'warning'
        })
      }
      
    }

    edadErrorMatcher = new edadErrorStateMatcher();

}

export class edadErrorStateMatcher implements ErrorStateMatcher {
  
  errado: boolean = false;
  mensaje: string = '';
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    
    this.errado = (
      ((!control?.value || control.value === '') ||
        control.value.length < 2 ||
        control.value < 21 ||
        control.value > 80) && 
      ((!control?.pristine && control?.dirty) || form?.submitted)
    ) ?? false;

    this.mensaje = !control?.value || control.value === '' ? 'La edad es un campo requerido' : 
                        control.value.length < 2 ? 'La edad debe tener al menos 2 digitos' :
                        control.value < 21 ? 'La edad debe ser mayora 20' :
                        'La edad debe ser menor a 81';

    if(this.errado) form?.form.setErrors({'invalid': true});

    return this.errado;
  }
  
}

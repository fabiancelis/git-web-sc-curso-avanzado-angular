import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permisoDisponible'
})
export class PermisoDisponiblePipe implements PipeTransform {

  transform(permisos: any[] | null, seleccionados: any[]): any[] {
    if(!permisos) return [];
    
    return permisos.filter(e => !seleccionados.includes(e));
  }

}

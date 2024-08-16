import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilModule } from './perfil/perfil.module';
import { PerfilComponent } from './perfil/perfil.component';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: AppComponent }, 
  { path: 'perfil', loadChildren: ()=> PerfilModule },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

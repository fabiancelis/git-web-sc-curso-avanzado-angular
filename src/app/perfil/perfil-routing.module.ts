import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from '@@auth-lib';

export const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
]


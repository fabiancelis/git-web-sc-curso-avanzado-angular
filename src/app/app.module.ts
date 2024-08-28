import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PermisoDisponiblePipe } from './shared/permiso-disponible.pipe';
import {  MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './auth.interceptor';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';

export function onToken() {
  console.log(sessionStorage.getItem('jwt'))
  return sessionStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    PermisoDisponiblePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: onToken,
        allowedDomains: ['148.113.191.183:9325'],
        disallowedRoutes: ['http://148.113.191.183:9325/basicosw/consulta/usuarios']
      }
    }),
    MatMenuModule,
    OverlayModule
  ],
  exports: [
    PermisoDisponiblePipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

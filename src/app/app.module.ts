import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CentroDeSaludComponent } from './centro-de-salud/centro-de-salud.component';
import { CentrosDeSaludService } from './services/centros-de-salud.service';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DepartamentoService } from './services/departamento.service';
import { TipoEstablecimientoService } from './services/tipo-establecimiento.service';
import { NivelAtencionService } from './services/nivel-atencion.service';


@NgModule({
  declarations: [
    AppComponent,
    CentroDeSaludComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfmP3Pqo0aBdUZmidCxUsXQDS5NPYLang'
    }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CentrosDeSaludService,
    DepartamentoService,
    NivelAtencionService,
    TipoEstablecimientoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

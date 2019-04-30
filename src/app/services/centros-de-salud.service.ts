import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CentroDeSalud } from '../model/centro-de-salud';
import { Api } from '../model/api';

@Injectable()
export class CentrosDeSaludService {
   apiUrl = Api.BaseUrl;

  constructor(private httpClient: HttpClient) { }

  ListaCentrosDeSalud: Observable<CentroDeSalud[]>;
  ListaCentrosDeSalud1: CentroDeSalud[];


  getCentrosDeSalud(): Observable<CentroDeSalud[]> {

    // console.log('llego al getCentrosDeSalud');

    this.ListaCentrosDeSalud = this.httpClient.get<CentroDeSalud[]>(this.apiUrl + 'CentroDeSalud/Map');

    return this.ListaCentrosDeSalud;
  }

}

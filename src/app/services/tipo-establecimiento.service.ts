import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { TipoEstablecimiento } from '../model/tipo-establecimiento';
import { Api } from '../model/api';


@Injectable()
export class TipoEstablecimientoService {

  apiUrl = Api.BaseUrl;

  constructor(private httpClient: HttpClient) { }

  getTipos(): Observable<TipoEstablecimiento[]> {

    // console.log('llego al getTipos');

    return this.httpClient.get<TipoEstablecimiento[]>(this.apiUrl + 'TipoEstablecimiento');
  }

}

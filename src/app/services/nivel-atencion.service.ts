import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { NivelAtencion } from '../model/nivel-atencion';
import { Api } from '../model/api';


@Injectable()
export class NivelAtencionService {

  apiUrl = Api.BaseUrl;

  constructor(private httpClient: HttpClient) { }

  getNiveles(): Observable<NivelAtencion[]> {

    // console.log('llego al getNiveles');

    return this.httpClient.get<NivelAtencion[]>(this.apiUrl + 'TipoNivelAtencion');
  }

}

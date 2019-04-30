import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Departamento } from '../model/departamento';
import { Api } from '../model/api';


@Injectable()
export class DepartamentoService {
  apiUrl = Api.BaseUrl;

  constructor(private httpClient: HttpClient) { }

  getDepartamento(): Observable<Departamento[]> {

    // console.log('llego al getDepartamento');s

    return this.httpClient.get<Departamento[]>(this.apiUrl + 'Departamento');
  }

  getKml() {
    // tslint:disable-next-line:no-debugger
    // debugger;
    // console.log('llego al getDepartamento');
    const x = this.httpClient.get('assets/kmz/Calingasta.kml', {responseType: 'text'});

    return x;
  }

}

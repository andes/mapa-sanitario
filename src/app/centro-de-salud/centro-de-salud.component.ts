import { Component, OnInit } from '@angular/core';
import { CentroDeSalud } from '../model/centro-de-salud';
import { Departamento } from '../model/departamento';
import { CentrosDeSaludService } from '../services/centros-de-salud.service';
import { DepartamentoService } from '../services/departamento.service';
import { NivelAtencion } from '../model/nivel-atencion';
import { TipoEstablecimiento } from '../model/tipo-establecimiento';
import { TipoEstablecimientoService } from '../services/tipo-establecimiento.service';
import { NivelAtencionService } from '../services/nivel-atencion.service';
import { LatLngBounds, LatLng, KmlLayerManager } from '@agm/core';
import { Api } from '../model/api';

import { GoogleMap } from '@agm/core/services/google-maps-types';
declare const google: any;

// import { geoXML3 } from 'geoxml3-kmz/geoxml3.js';
import * as geoXML3 from 'geoxml3-kmz/geoxml3.js';
declare const window: any;


@Component({
  selector: 'app-centro-de-salud',
  templateUrl: './centro-de-salud.component.html',
  styleUrls: [
    './centro-de-salud.component.css',
    './centro-de-salud.component.scss'
  ]
})
export class CentroDeSaludComponent implements OnInit {

  BaseUrl = Api.BaseUrl;
  BaseUrlImgCS = Api.BaseUrlImgCS;
  csTittle = 'Centros de Salud';


  showLabel = false;

  showHighlight = false;
  selectedMostrarSombreado = 'noMostrar';

  showOverlay = false;

  cantCentrosDeSalud = 0;
  textBusqueda = '';
  isVisibleSideBar = true;
  fitBound: LatLngBounds;
  latLng: LatLng;
  map: GoogleMap;

  myParser: any;


  lat = -30.8351832;
  lng = -68.5223334;

  triangleCoords = [
    { lat: 25.774, lng: -80.190 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 }
  ];
  strokeColor: '#FF0000';
  strokeOpacity: 0.8;
  strokeWeight: 3;
  fillColor: '#FF0000';
  fillOpacity: 0.35;

  // kml: string;

  // Centro De Salud Properties
  centroDeSalud: CentroDeSalud;
  centrosDeSaludAll: CentroDeSalud[];
  centrosDeSaludForView: CentroDeSalud[];


  // Departamento Properties
  selectedDepto = '0';
  selectedDeptoKML: Departamento;
  departamentos: Departamento[];
  departamentosForView: Departamento[];

  // Nivel de Atencion Properties
  selectedNivel = '0';
  niveles: NivelAtencion[];

  // Tipo de Establecimiento Properties
  selectedTipo = '0';
  selectedTipos: string[] = [];
  tipos: TipoEstablecimiento[];
  checkedTipo = true;
  // chk: ElementRef = @ViewChild('input1');

  // Zona Properties
  selectedZona = '0';

  // Internet Properties
  selectedTieneConexion = 'todos';
  // tieneInternet = false;


  constructor(
    private centroDeSaludService: CentrosDeSaludService,
    private departamentoService: DepartamentoService,
    private tipoEstablecimientoService: TipoEstablecimientoService,
    private nivelAtencionService: NivelAtencionService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    geoXML3; // Inicializa libreria 'geoXML3.js'

    this.getCentrosDeSalud();
    this.getDepartamento();
    this.getNiveles();
    this.getTipos();

  }


  getCentrosDeSalud(): void {
    this.centroDeSaludService.getCentrosDeSalud().subscribe(cs => {
      this.centrosDeSaludAll = cs.filter(r => r.Latitud !== null && r.Longitud !== null)
        .sort(function (a, b) { return (a.Nombre > b.Nombre) ? 1 : ((b.Nombre > a.Nombre) ? -1 : 0); });

      this.centrosDeSaludForView = this.centrosDeSaludAll;
      this.cantCentrosDeSalud = this.centrosDeSaludForView.length;
      // this.boundMarkers();
    });
  }

  getKml(dep: Departamento): void {
    // tslint:disable-next-line:no-debugger
    debugger;


    if (dep === null && this.selectedDepto !== '0') {
      dep = this.departamentosForView.find( r => r.ID === +this.selectedDepto );
    }

    this.selectedDeptoKML = dep;

    if (this.selectedMostrarSombreado === 'noMostrar') {
      this.hideAllPolygons();
      return;
    }


    let path = '';
    if (dep === null || typeof (dep) === 'undefined') {
      path = './assets/kmz/San Juan.kml';
    } else {

      switch (this.selectedMostrarSombreado) {
        case 'depto':
          path = './assets/kmz/' + dep.Nombre + '.kml';
          break;

        case 'areaProg':
          path = this.BaseUrl + '/CentroDeSalud/MapKmlAp/' + this.selectedDepto;
          break;

        default:
          break;
      }



    }

    if (window.geoXML3.instances.length > 0) {

      const myParser = window.geoXML3.instances[0];
      this.hideAllPolygons();
      myParser.parse(path);

    } else {

      const myParser = window.geoXML3.parser({ map: this.map });
      myParser.parse(path);

    }

    this.boundMarkers();
  }

  hideAllPolygons() {
    if (window.geoXML3.instances.length > 0) {

      const myParser = window.geoXML3.instances[0]; //

      if (myParser.docs.length > 0) {
        myParser.docs.filter(r => r.gpolygons[0].map != null).forEach(element => {
          myParser.hideDocument(element);
        });
      }
    }

  }

  getDepartamento(): void {
    this.departamentoService.getDepartamento().subscribe(dep => {
      this.departamentos = dep;
      this.departamentosForView = this.departamentos;
      // this.selectedDepto = 413;
    });
  }

  getNiveles(): void {
    this.nivelAtencionService.getNiveles().subscribe(niv => {
      this.niveles = niv;
      // this.selectedDepto = 413;
    });
  }

  getTipos(): void {
    this.tipoEstablecimientoService.getTipos().subscribe(tipos => {
      this.tipos = tipos;
      // this.selectedDepto = 413;
    });
  }

  selectionChange(): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.filterCentosDeSalud();

  }

  filterCentosDeSalud(): void {

    // debugger

    // Filtra Zona
    if (this.selectedZona === '0') {
      this.centrosDeSaludForView = this.centrosDeSaludAll;
      this.departamentosForView = this.departamentos;

    } else {
      this.centrosDeSaludForView = this.centrosDeSaludAll.filter(r => r.Zona === +this.selectedZona);
      this.departamentosForView = this.departamentos.filter(r => r.Zona === +this.selectedZona);
    }

    // Filtra Departamentos
    if (this.selectedDepto === '0' || !this.departamentosForView.some(r => r.ID === +this.selectedDepto)) {
      this.selectedDepto = '0';
      this.centrosDeSaludForView = this.centrosDeSaludForView;
    } else {
      this.centrosDeSaludForView = this.centrosDeSaludForView.filter(r => r.DepartamentoID === +this.selectedDepto);
    }

    // Filtra Tipos de establecimiento
    if (this.selectedTipos.length === 0) {
      this.centrosDeSaludForView = this.centrosDeSaludForView;
    } else {
      this.centrosDeSaludForView = this.centrosDeSaludForView.filter(r => this.selectedTipos.some(x => +x === r.TipoEstablecimientoID));
    }


    // Filtra Niveles de Atencian
    if (this.selectedNivel === '0') {
      this.centrosDeSaludForView = this.centrosDeSaludForView;
    } else {
      this.centrosDeSaludForView = this.centrosDeSaludForView.filter(r => r.TipoNivelAtencionID === +this.selectedNivel);
    }

    // Filtra Si tiene Internet
    switch (this.selectedTieneConexion) {
      case 'todos':
        this.centrosDeSaludForView = this.centrosDeSaludForView;
        break;

      case 'tiene':
        this.centrosDeSaludForView = this.centrosDeSaludForView
          .filter(r => r.TieneInternet);
        break;

      case 'noTiene':
        this.centrosDeSaludForView = this.centrosDeSaludForView
          .filter(r => !r.TieneInternet);
        break;

      default:
        this.centrosDeSaludForView = this.centrosDeSaludForView;
        break;
    }





    // Filtra por Nombre
    if (this.textBusqueda.length === 0) {
      this.centrosDeSaludForView = this.centrosDeSaludForView;
    } else {
      this.centrosDeSaludForView = this.centrosDeSaludForView
        .filter(r => r.Nombre.trim().toUpperCase().includes(this.textBusqueda.trim().toUpperCase()));
    }

    this.cantCentrosDeSalud = this.centrosDeSaludForView.length;
    if (this.cantCentrosDeSalud === 0) {
      this.showOverlay = true;
    } else {
      this.showOverlay = false;
    }
    this.boundMarkers();


  }

  boundMarkers(): void {
    this.fitBound = new google.maps.LatLngBounds();

    this.centrosDeSaludForView.forEach(r => {
      this.latLng = new google.maps.LatLng(+r.Latitud, +r.Longitud);
      this.fitBound.extend(this.latLng);
    });
  }

  cleanFilters(): void {
    this.textBusqueda = '';
    this.selectedDepto = '0';
    this.selectedNivel = '0';
    this.selectedTipo = '0';
    this.selectedZona = '0';
    this.selectedTieneConexion = 'todos';
    this.centrosDeSaludForView = this.centrosDeSaludAll;
    this.cantCentrosDeSalud = this.centrosDeSaludForView.length;
    this.getKml(null);
    this.showOverlay = false;
    this.selectedTipos = [];

    this.checkedTipo = true;
    this.checkedTipo = false;

    // this.boundMarkers();
    this.filterCentosDeSalud();

  }


  mapReady(event) {
    this.map = event;
    // tslint:disable-next-line:no-debugger
    // debugger;


    // const ctaLayer = new google.maps.KmlLayer({
    //   url: '/assets/kmz/Calingasta.kml' // 'https://www.dropbox.com/s/0grhlim3q4572jp/ROU_adm2%20-%20Copy.kml?dl=1'
    // });
    // ctaLayer.setMap(this.map);


    // Define the LatLng coordinates for the polygon.
    // const triangleCoords = [
    //   { lat: 25.774, lng: -80.190 },
    //   { lat: 18.466, lng: -66.118 },
    //   { lat: 32.321, lng: -64.757 }
    // ];

    // Construct the polygon.
    // const bermudaTriangle = new google.maps.Polygon({
    //   paths: triangleCoords,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 3,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35
    // });
    // bermudaTriangle.setMap(this.map);

    // this.getKml();
    // console.log(event);
  }


  changeSelectedTipo(event) {
    // tslint:disable-next-line:no-debugger
    // debugger;
    let index: number;

    if (event.checked) {
      // add value to array
      this.selectedTipos.push(event.source.value);

    } else {
      // delete value to array
      index = this.selectedTipos.indexOf(event.source.value);
      if (index > -1) {
        this.selectedTipos.splice(index, 1);
      }

    }
    this.filterCentosDeSalud();

  }

}

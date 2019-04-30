export class CentroDeSalud {

  ID: number;
  Nombre: string;
  Telefono: string;
  Latitud: Number;
  Longitud: Number;
  Zona: number;
  DepartamentoID: number;
  Departamento: string;
  LocalidadID: number;
  Localidad: string;
  Direccion: string;
  TipoNivelAtencionID: number;
  TipoNivelAtencion: string;
  TipoEstablecimientoID: number;
  TipoEstablecimiento: string;
  TieneInternet: boolean;
  URLImagenDelCentroDeSalud: string;
  ProveedorConectividadPorCentroDeSalud: ProveedorConectividadPorCentroDeSalud[];
}

class ProveedorConectividadPorCentroDeSalud {
  Nombre: string;
  VelocidadBajada: string;
  VelocidadSubida: string;
  TipoConexionInternet: string;
}

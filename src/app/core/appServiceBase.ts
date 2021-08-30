/**
     * Importaciones principales
     */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
     * Elementos de injectable
     */
@Injectable({
  providedIn: 'root',
})
/* Exportaciones del componente */
export class AppServiceBase {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache');

/* Constructor donde se importan las funciones que usa la logica del componente */
  constructor(protected http: HttpClient) {}
/**
     * Met get con variable api de tipo cadena
     */
  get(api: string) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.get(urlApi);
  }

 /**
     * Met getByID con variable api Y id de tipo cadena y any respectivamente
     */
  getById(api: string, id: any) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.get(urlApi);
  }

  /**
     * Met post con variables api y body de tipo cadena y any respectivamente
     */
  post(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body, { headers: this.headers });
  }

   /**
     * Metodo put con variables api y body de tipo cadena y any respectivamente
     */
  put(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body);
  }

   /**
     * delete con variables api y id ambos de tipo cadena
     */
  delete(api: string, id: string) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.delete(urlApi);
  }
}

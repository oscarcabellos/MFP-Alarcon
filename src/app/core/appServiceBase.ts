import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class AppServiceBase {
  constructor(protected http: HttpClient) {}

  get(api: string) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.get(urlApi);
  }

  getById(api: string, id: any) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.get(urlApi);
  }

  post(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body);
  }

  put(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body);
  }

  delete(api: string, id: string) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.delete(urlApi);
  }
}

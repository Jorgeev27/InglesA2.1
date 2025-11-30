import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesDetalleService {

  private backend = "http://inglesa21.mywebcommunity.org/htdocs/apiclasesdetalle.php"; 
  // CAMBIA ESTA URL SI TU ARCHIVO PHP DE DETALLE ES OTRO

  private proxyUrl = "https://ingles-a2-1.vercel.app/api/proxy?url=" 
                      + encodeURIComponent(this.backend);

  constructor(private http: HttpClient) {}

  obtenerClasesDetalle(): Observable<any> {
    return this.http.get(this.proxyUrl);
  }

  insertarClaseDetalle(data: any): Observable<any> {
    return this.http.post(this.proxyUrl, data);
  }
}

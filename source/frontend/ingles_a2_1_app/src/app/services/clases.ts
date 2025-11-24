// clases.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  // URL directa de tu PHP (InfinityFree)
  private backendUrl = "http://inglesa21.infinityfreeapp.com/api/apiclases.php";
  
  // Usamos el proxy relativo. Al subirlo a Vercel, sabrá que es su propia carpeta /api
  private proxyUrl = "/api/proxy?url=" + encodeURIComponent(this.backendUrl);

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<any> {
    return this.http.get(this.proxyUrl);
  }

  insertarClase(data: any): Observable<any> {
    return this.http.post(this.proxyUrl, data);
  }
}
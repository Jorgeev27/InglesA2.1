import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  // CAMBIADO: Apunta al proxy local en Vercel
  // Vercel sabe que /api/proxy debe ejecutar el archivo api/proxy.js
  private apiUrl = "../../../api/proxy.js"; 

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  insertarClase(data: any): Observable<any> {
    // Esto seguirá funcionando porque el proxy.js reenviará la petición POST
    return this.http.post(this.apiUrl, data);
  }
}
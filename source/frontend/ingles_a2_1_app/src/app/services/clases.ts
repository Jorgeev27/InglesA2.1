import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private backendUrl = "http://inglesa21.mywebcommunity.org/apiclases.php";

  private proxyUrl = "https://ingles-a2-1.vercel.app/api/proxy?url=" + encodeURIComponent(this.backendUrl);

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<any> {
    return this.http.get(this.proxyUrl);
  }

  insertarClase(data: any): Observable<any> {
    return this.http.post(this.proxyUrl, data);
  }
}

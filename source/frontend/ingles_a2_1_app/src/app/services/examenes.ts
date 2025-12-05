import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {


    private backend = "http://inglesa21.mywebcommunity.org/htdocs/apiexamenes.php"; 
  // ¡CAMBIA ESTA URL POR LA QUE FUNCIONE!

  private proxyUrl = "https://ingles-a2-1.vercel.app/api/proxy?url=" 
                      + encodeURIComponent(this.backend);

  constructor(private http: HttpClient) {}

  obtenerExamenes(): Observable<any> {
    return this.http.get(this.proxyUrl);
  }

  agregarExamen(data: any): Observable<any> {
    return this.http.post(this.proxyUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private apiUrl = "http://inglesa21.mywebcommunity.org/htdocs/apiclases.php";

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  insertarClase(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
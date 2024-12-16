import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEventosPrincipalService {
  eventosPrincipalUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_eventos_principal'
  constructor(private http: HttpClient) { }

  gerarEventos(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.eventosPrincipalUrl, null, {headers});
  }
}

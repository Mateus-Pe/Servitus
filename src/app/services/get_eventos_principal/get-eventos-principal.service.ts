import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEventosPrincipalService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  gerarEventos(): Observable<any>{
    const eventosPrincipalUrl = `${this.baseUrl}/templo/index.php/welcome/get_eventos_principal`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(eventosPrincipalUrl, null, {headers});
  }
}
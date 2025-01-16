import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventoAgendaService {

  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  getEventoAgenda():Observable<any>{
    const eventoAgendaUrl = `${this.baseUrl}/templo/index.php/welcome/get_evento_agenda`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any[]>(eventoAgendaUrl, null, {headers});
  }
}

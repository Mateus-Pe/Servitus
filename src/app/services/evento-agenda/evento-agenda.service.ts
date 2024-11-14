import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventoAgendaService {

  
  private eventoAgendaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_evento_agenda';
  constructor(private http: HttpClient) { }

  getEventoAgenda():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any[]>(this.eventoAgendaUrl, null, {headers});
  }
}

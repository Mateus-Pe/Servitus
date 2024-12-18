import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEventoByAgendaIdService {
  private eventoByAgendaId = 'https://pedeoferta.com.br/templo/index.php/welcome/get_evento_by_agenda_id';
  constructor(private http: HttpClient) { }

  getEventoByAgendaId(agendaId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_id', agendaId.toString());

    return this.http.post<any>(this.eventoByAgendaId, body.toString(), {headers});
  }
}

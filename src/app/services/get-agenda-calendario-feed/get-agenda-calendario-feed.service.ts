import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAgendaCalendarioFeedService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  getAgendaCalendarioFeed(cidadeId: number, dataReferencia: string): Observable<any>{
    const agendaCalendarioFeedUrl = `${this.baseUrl}/templo/index.php/welcome/get_agenda_calendario_feed`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('cidade_id', cidadeId.toString());
    body.set('data_referencia', dataReferencia);

    return this.http.post<any>(agendaCalendarioFeedUrl, body.toString(), { headers })
  }
}

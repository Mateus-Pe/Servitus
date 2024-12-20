import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAgendaCalendarioFeedService {
  private agendaCalendarioFeedUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario_feed';
  constructor(private http: HttpClient) { }

  getAgendaCalendarioFeed(cidadeId: number, dataReferencia: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('cidade_id', cidadeId.toString());
    body.set('data_referencia', dataReferencia);

    return this.http.post<any>(this.agendaCalendarioFeedUrl, body.toString(), { headers })
  }
}

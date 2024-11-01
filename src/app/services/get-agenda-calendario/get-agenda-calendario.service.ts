import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAgendaCalendarioService {
  private getAgendaCalendarioUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario';
  constructor(private http: HttpClient) { }
  getAgendaCalendario(igrejaId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());
    return this.http.post<any>(this.getAgendaCalendarioUrl, body.toString(), { headers });
  }
}

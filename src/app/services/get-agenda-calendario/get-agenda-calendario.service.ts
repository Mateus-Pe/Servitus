import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAgendaCalendarioService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  getAgendaCalendario(igrejaId: number): Observable<any>{
    const getAgendaCalendarioUrl = `${this.baseUrl}/templo/index.php/welcome/get_agenda_calendario`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());
    return this.http.post<any>(getAgendaCalendarioUrl, body.toString(), { headers });
  }
}

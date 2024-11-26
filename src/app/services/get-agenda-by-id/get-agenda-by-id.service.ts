import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAgendaByIdService {
  private getAgendaByIdUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_by_id';
  constructor(private http: HttpClient) { }

  getAgendaById(agendaId: number):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_id', agendaId.toString());

    return this.http.post<any>(this.getAgendaByIdUrl, body.toString(), { headers})
  }
}

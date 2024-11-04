import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CalendarioHora {
  agenda_id: number;
  agenda_hora: string;
  evento_nome: string;
  agenda_layout_tipo: number;
  agenda_img: string;
  igreja_logo_url: string;
  igreja_nome: string;
  agenda_layout_upload_desc: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaCalendarioHoraService {
  private agendaCalendarioHoraUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_agenda_calendario_hora';
  constructor(private http: HttpClient) { }
  getAgendaCalendarioHora(igrejaId:number, dtReferencia: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());
    body.set('data_referencia', dtReferencia);
    return this.http.post<{ calendario_hora: CalendarioHora[] }>(this.agendaCalendarioHoraUrl, body.toString(), { headers });
  }
}

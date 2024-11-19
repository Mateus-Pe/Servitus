import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerarAgendaEspecificaService {
  gerarAgendaEspecificaurl = 'https://pedeoferta.com.br/templo/index.php/welcome/gerar_agenda_especifica';
  constructor(private http: HttpClient) { }

  gerarAgendaEspecifica(igrejaId: number,
                        atualEventoId: number,
                        agendaEventoOutro: string,
                        agendaData: string,
                        agendaDeHora: number,
                        agendaDeMinuto: number,
                        agendaAteHora: number,
                        agendaAteMinuto: number
  ): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_igreja_id', igrejaId.toString());
    body.set('agenda_evento_id', atualEventoId.toString());
    body.set('agenda_evento_outro', agendaEventoOutro);
    body.set('agenda_data', agendaData);
    body.set('agenda_de_hora', agendaDeHora.toString());
    body.set('agenda_de_minuto', agendaDeMinuto.toString());
    body.set('agenda_ate_hora', agendaAteHora.toString());
    body.set('agenda_ate_minuto', agendaAteMinuto.toString());

    return this.http.post<any>(this.gerarAgendaEspecificaurl, body.toString(), {headers});
  }
}

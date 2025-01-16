import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerarAgendaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  getGerarAgenda(dias: string,
    igrejaId: number,
    atualEventoId: number,
    agendaEventoOutro: string,
    agendaDias: number,
                 tempoDuracao: number,
                 agendaDe: string,
                 agendaAte: string,
                 agendaDeHora: number,
                 agendaDeMinuto: number,
                 agendaAteHora: number,
                 agendaAteMinuto: number
  ):Observable<any>{
    const gerarAgendaUrl = `${this.baseUrl}/templo/index.php/welcome/gerar_agenda`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('dias', dias);
    body.set('agenda_igreja_id', igrejaId.toString());
    body.set('agenda_evento_id', atualEventoId.toString());
    body.set('agenda_evento_outro', agendaEventoOutro);
    body.set('agenda_dias', agendaDias.toString());
    body.set('tempo_duracao', tempoDuracao.toString());
    body.set('agenda_de', agendaDe);
    body.set('agenda_ate', agendaAte);
    body.set('agenda_de_hora', agendaDeHora.toString());
    body.set('agenda_de_minuto', agendaDeMinuto.toString());
    body.set('agenda_ate_hora', agendaAteHora.toString());
    body.set('agenda_ate_minuto', agendaAteMinuto.toString());

    return this.http.post<any>(gerarAgendaUrl, body.toString(), {headers})
  }
}

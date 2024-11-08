import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveAgendaService {
  private removeAgendaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/remove_agenda';

  constructor(private http: HttpClient) { }

  getRemoveAgenda(agendaId: number, flagLote: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_id', agendaId.toString());
    body.set('flag_lote', flagLote.toString());

    return this.http.post<any>(this.removeAgendaUrl, body.toString(), { headers }).pipe(
      catchError(error => {
        console.error('Erro ao remover a agenda', error);
        return throwError(error);
      })
    );
  }
}

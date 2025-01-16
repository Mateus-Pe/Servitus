import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveAgendaService {
  private baseUrl = (window as any).baseUrl;
  
  constructor(private http: HttpClient) { }
  
  getRemoveAgenda(agendaId: number, flagLote: number): Observable<any> {
    const removeAgendaUrl = `${this.baseUrl}/templo/index.php/welcome/remove_agenda`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_id', agendaId.toString());
    body.set('flag_lote', flagLote.toString());

    return this.http.post<any>(removeAgendaUrl, body.toString(), { headers }).pipe(
      catchError(error => {
        console.error('Erro ao remover a agenda', error);
        return throwError(error);
      })
    );
  }
}

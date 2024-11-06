import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreLoteService {
  private preLoteUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/pre_lote';
  constructor(private http: HttpClient) { }

  getPreLote(agendaId: number):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('agenda_id', agendaId.toString());

    return this.http.post<any>(this.preLoteUrl, body.toString(), { headers });
  }
}

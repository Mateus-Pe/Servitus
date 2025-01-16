import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEstatisticaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  getEstatistica(paroquiaId: number): Observable<any> {
    const eventosGeraisUrl = `${this.baseUrl}/templo/index.php/welcome/get_estatistica`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('paroquia_id', paroquiaId.toString());
    return this.http.post<any>(eventosGeraisUrl, body.toString(), {headers});
  }
}

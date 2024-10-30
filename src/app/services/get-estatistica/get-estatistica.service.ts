import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEstatisticaService {
  private eventosGeraisUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_estatistica';
  constructor(private http: HttpClient) { }
  getEstatistica(paroquiaId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('paroquia_id', paroquiaId.toString());
    return this.http.post<any>(this.eventosGeraisUrl, body.toString(), {headers});
  }
}

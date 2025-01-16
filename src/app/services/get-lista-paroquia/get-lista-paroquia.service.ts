import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetListaParoquiaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  getParoquia(cidadeId: number): Observable<any> {
    const getParoquiaUrl = `${this.baseUrl}/templo/index.php/welcome/get_lista_paroquia`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('cidade_id', cidadeId.toString());
    return this.http.post<any>(getParoquiaUrl, body.toString(), {headers});
  }
}

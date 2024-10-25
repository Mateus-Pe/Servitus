import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetListaParoquiaService {
  private getParoquiaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_lista_paroquia';
  constructor(private http: HttpClient) { }
  getParoquia(cidadeId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('cidade_id', cidadeId.toString());
    return this.http.post<any>(this.getParoquiaUrl, body.toString(), {headers});
  }
}

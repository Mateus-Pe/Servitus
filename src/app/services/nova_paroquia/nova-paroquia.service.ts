import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovaParoquiaService {
  private novaParoquiaUrl = "https://pedeoferta.com.br/templo/index.php/welcome/nova_paroquia";
  constructor(private http: HttpClient) { }
  getNovaParoquia(cidadeId: number, paroquiaNome: string = ''): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `paroquia_cidade_id=${cidadeId}&paroquia_nome=${encodeURIComponent(paroquiaNome)}`;
    return this.http.post<any>(this.novaParoquiaUrl, body, {headers});
  }
}

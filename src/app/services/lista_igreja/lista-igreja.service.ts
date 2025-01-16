import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaIgrejaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  getListaIgreja(paroquiaId: number): Observable <any> {
    const listaIgrejaUrl = `${this.baseUrl}/templo/index.php/welcome/get_lista_igreja`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('paroquia_id', paroquiaId.toString());
    return this.http.post<any>(listaIgrejaUrl, body.toString(), {headers});
  }
}

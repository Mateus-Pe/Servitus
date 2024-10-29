import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_cidades_temp';

  constructor(private http: HttpClient) {}

  getCidades(importancia: string): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params: { importancia } });
  }
}

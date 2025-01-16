import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseUrl = (window as any).baseUrl;
  
  constructor(private http: HttpClient) {}
  
  getCidades(importancia: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/templo/index.php/welcome/get_cidades_temp`;
    return this.http.get<any>(apiUrl, { params: { importancia } });
  }
}

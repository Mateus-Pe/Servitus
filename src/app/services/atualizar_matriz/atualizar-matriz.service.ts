import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarMatrizService {
  private baseUrl = (window as any).baseUrl;
  private igrejasSubject = new BehaviorSubject<any[]>([]);
  igrejas$ = this.igrejasSubject.asObservable();
  
  setIgrejas(igrejas: any[]) {
    this.igrejasSubject.next(igrejas);
  }
  
  constructor(private http: HttpClient) {}
  
  getAtualizarMatriz(igrejaId: number, paroquiaId: number): Observable<any> {
    const atualizarMatrizUrl = `${this.baseUrl}/templo/index.php/welcome/atualizar_matriz`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());
    body.set('paroquia_id', paroquiaId.toString());
    return this.http.post<any>(atualizarMatrizUrl, body.toString(), { headers });
  }
}

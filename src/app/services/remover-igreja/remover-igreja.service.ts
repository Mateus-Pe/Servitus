import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoverIgrejaService {
  private removeIgrejaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/remove_igreja';
  private igrejasSubject = new BehaviorSubject<any[]>([]);
  igrejas$ = this.igrejasSubject.asObservable();

  setIgrejas(igrejas: any[]) {
    this.igrejasSubject.next(igrejas);
  }

  constructor(private http: HttpClient) { }

  getRemoverIgreja(igrejaId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());
    return this.http.post<any>(this.removeIgrejaUrl, body.toString(), { headers });
  }
}

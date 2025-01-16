import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIgrejaByIdService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }

  igrejaById(igrejaId: number): Observable<any>{
    const igrejaByIdUrl = `${this.baseUrl}/templo/index.php/welcome/get_igreja_by_id`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());

    return this.http.post<any>(igrejaByIdUrl, body.toString(), {headers});
  }
}

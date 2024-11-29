import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIgrejaByIdService {
  igrejaByIdUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_igreja_by_id';
  constructor(private http: HttpClient) { }

  igrejaById(igrejaId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('igreja_id', igrejaId.toString());

    return this.http.post<any>(this.igrejaByIdUrl, body.toString(), {headers});
  }
}

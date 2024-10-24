import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaService {
  private esqueciSenhaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/esqueci_senha';
  constructor(private http: HttpClient) { }
  esqueci_senha(usuario_celular: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_celular', usuario_celular);

    return this.http.post<any>(this.esqueciSenhaUrl, body.toString(), { headers });
  }
}
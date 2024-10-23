import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/login';

  constructor(private http: HttpClient) { }

  login(usuario_celular: string, usuario_senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_celular', usuario_celular);
    body.set('usuario_senha', usuario_senha);

    return this.http.post<any>(this.loginUrl, body.toString(), { headers });
  }
}
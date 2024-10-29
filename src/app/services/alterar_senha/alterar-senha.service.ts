import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlterarSenhaService {
  private alterarSenhaUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/alterar_senha';
  constructor(private http: HttpClient) { }
  alterar_senha(usuario_senha: string, usuario_token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_senha', usuario_senha);
    body.set('usuario_token', usuario_token);
    return this.http.post<any>(this.alterarSenhaUrl, body.toString(), { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlterarSenhaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  alterar_senha(usuario_senha: string, usuario_token: string): Observable<any> {
    const alterarSenhaUrl = `${this.baseUrl}/templo/index.php/welcome/alterar_senha`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_senha', usuario_senha);
    body.set('usuario_token', usuario_token);
    return this.http.post<any>(alterarSenhaUrl, body.toString(), { headers });
  }
}
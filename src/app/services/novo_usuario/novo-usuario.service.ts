import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  getNovoUsuario(usuarioParoquiaId : number, usuarioNome: string, usuarioCelular: number, usuarioTipo: string): Observable<any>{
    const novoUsuarioUrl = `${this.baseUrl}/templo/index.php/welcome/novo_usuario`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_paroquia_id', usuarioParoquiaId.toString());
    body.set('usuario_nome', usuarioNome);
    body.set('usuario_celular', usuarioCelular.toString());
    body.set('usuario_tipo', usuarioTipo);
    return this.http.post<any>(novoUsuarioUrl, body.toString(), {headers});
  }
}

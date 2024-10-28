import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {
  private novoUsuarioUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/novo_usuario';
  constructor(private http: HttpClient) { }
  getNovoUsuario(usuarioParoquiaId : number, usuarioNome: string, usuarioCelular: number, usuarioTipo: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('usuario_paroquia_id', usuarioParoquiaId.toString());
    body.set('usuario_nome', usuarioNome);
    body.set('usuario_celular', usuarioCelular.toString());
    body.set('usuario_tipo', usuarioTipo);
    return this.http.post<any>(this.novoUsuarioUrl, body.toString(), {headers});
  }
}

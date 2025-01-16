import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncluirIgrejaService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  incluirIgreja(
                endereco_cep: number,
                endereco_logradouro: string,
                endereco_numero: number,
                endereco_bairro: string,
                endereco_cidade: string,
                endereco_cidade_id: number,
                endereco_latitude: number,
                endereco_longitude: number,
                igreja_nome: string,
                igreja_logo_url: string,
                igreja_matriz: number,
                paroquia_id: number,
                igreja_desc_resumida: string
              )
              :Observable<any> {
    const inluirIgrejaUrl = `${this.baseUrl}/templo/index.php/welcome/incluir_igreja`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('endereco_cep', endereco_cep.toString());
    body.set('endereco_logradouro', endereco_logradouro);
    body.set('endereco_numero', endereco_numero.toString());
    body.set('endereco_bairro', endereco_bairro);
    body.set('endereco_cidade', endereco_cidade);
    body.set('endereco_cidade_id', endereco_cidade_id.toString());
    body.set('endereco_latitude', endereco_latitude.toString());
    body.set('endereco_longitude', endereco_longitude.toString());
    body.set('igreja_nome', igreja_nome);
    body.set('igreja_logo_url', igreja_logo_url);
    body.set('igreja_matriz', igreja_matriz.toString());
    body.set('paroquia_id', paroquia_id.toString());
    body.set('igreja_desc_resumida', igreja_desc_resumida);
    return this.http.post<any>(inluirIgrejaUrl, body.toString(), { headers });
  }
}

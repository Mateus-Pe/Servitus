import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MatrizResponse {
  status: string;
  matriz: {
    igreja_nome: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GetMatrizService {
  private getMatrizUrl= 'https://pedeoferta.com.br/templo/index.php/welcome/get_matriz';
  constructor(private http: HttpClient) { }
  getMatriz(paroquiaId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('paroquia_id', paroquiaId.toString());
    return this.http.post<MatrizResponse>(this.getMatrizUrl, body.toString(), { headers});
  }
}

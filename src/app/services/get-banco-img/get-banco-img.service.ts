import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBancoImgService {
  getBancoImgUrl = 'https://pedeoferta.com.br/templo/index.php/welcome/get_banco_imagem';
  constructor(private http: HttpClient) { }

  getBancoImg(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=UTF-8',
    });
    return this.http.post(this.getBancoImgUrl, '', { headers });
  }
}

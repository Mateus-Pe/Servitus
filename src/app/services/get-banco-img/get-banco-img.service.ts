import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBancoImgService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  getBancoImg(): Observable<any>{
    const getBancoImgUrl = `${this.baseUrl}/templo/index.php/welcome/get_banco_imagem`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=UTF-8',
    });
    return this.http.post(getBancoImgUrl, '', { headers });
  }
}

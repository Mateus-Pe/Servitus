import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjaxCepService {
  
  constructor(private http: HttpClient) { }

  ajaxCep(cep: string):Observable<any>{
    const apiUrl = `http://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(apiUrl);
  }
}

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlGetParoquias = 'https://pedeoferta.com.br/templo/index.php/welcome/get_cidades_temp';

  constructor(private client: HttpClient) { }

  getParoquias(): Observable<any>{
    console.log("Chamando o serviço getParoquias");
   // const headers = new HttpHeaders({
   //   'Content-Type': 'application/json'  // ou 'application/x-www-form-urlencoded'
   // });
    //const id = { cidade_id: cidadeId };  // Enviando 'cidade_id' como um objeto simples
  return this.client.get<any>(this.urlGetParoquias);
  
  }

  
}

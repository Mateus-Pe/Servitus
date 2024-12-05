import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesPdoService {
  private citiesPdoUrl = 'https://pedeoferta.com.br/oferta/welcome/get_cities_pdo';
  constructor(private http: HttpClient) { }

  getCities( uf: string): Observable<any>{
    const params = new HttpParams()
    .set('uf', uf);

    return this.http.get<any>(this.citiesPdoUrl, {params});
  }
}

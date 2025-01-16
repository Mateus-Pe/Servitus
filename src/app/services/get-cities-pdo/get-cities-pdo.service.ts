import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesPdoService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }
  
  getCities( uf: string): Observable<any>{
    const citiesPdoUrl = `${this.baseUrl}/oferta/welcome/get_cities_pdo`;
    const params = new HttpParams()
    .set('uf', uf);

    return this.http.get<any>(citiesPdoUrl, {params});
  }
}

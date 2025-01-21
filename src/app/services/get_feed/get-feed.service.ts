import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFeedService {
  private baseUrl = (window as any).baseUrl;
  constructor(private http: HttpClient) { }

  getFeed(data: { [key: string]: any }):Observable<any>{
    const getFeedUrl = `${this.baseUrl}/templo/index.php/welcome/get_feed`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.post<any>(getFeedUrl, body, {headers});
  }
}

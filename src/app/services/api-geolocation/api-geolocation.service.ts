import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GeoLocation {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  private apiKey = 'AIzaSyBjVDWPYDC5zoxBw0zW4bdnnaelnyCWdkw';

  constructor(private http: HttpClient) {}

  apiGeoLocation(address: string): Observable<GeoLocation | null> {
    const params = new HttpParams()
      .set('address', address)
      .set('key', this.apiKey);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response && response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        }
        return null; // Retorna `null` se não houver resultados
      })
    );
  }
}

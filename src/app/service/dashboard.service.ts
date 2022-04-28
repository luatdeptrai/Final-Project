import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface CountrRegion {
  countryregion: string;
  countrycode: [];
}
interface CountryDetail {
  provincestate: string;
  countryregion: string;
  lastupdate: Date;
  location: {
    lat: Number;
    lng: Number;
  };
  confirmed: number;
  deaths: number;
  recovered: number;
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getAllCase(): Observable<any> {
    return this.http.get<any>(`http://localhost:80/jhu-edu/brief`);
  }

  GetAllDataCountries(): Observable<any> {
    return this.http.get<any>(`http://localhost:80/jhu-edu/latest?onlyCountries=true`);
  }

  GetAllDataRegion(): Observable<any> {
    return this.http.get<any>(`http://localhost:80/jhu-edu/latest`);
  }

  SearchValByIso2(Value: string) {
    return this.http.get<CountryDetail>(
      `http://localhost:80/jhu-edu/latest?iso2=${Value}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface timeseriesCountry {
  Dateday: {
    confirmed: number;
    deaths: number;
    recovered: number;
  };
}
interface CountryTimeseri {
  countryregion: string;
  timeseries: timeseriesCountry[];
}
@Injectable({
  providedIn: 'root',
})
export class ChartService {
  IsoCountry2 = '';
  constructor(private http: HttpClient) {}
  GetTimeseriesByIso2(Country: string) {
    return this.http.get<any>(
      `http://localhost:80/jhu-edu/timeseries?iso2=${Country}&onlyCountries=true`
    );
  }
  getData() {
    return this.IsoCountry2;
  }
}

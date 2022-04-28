import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  GetAllValue(): Observable<any> {
    return this.http.get<any>('http://localhost:80/jhu-edu/News');
  }
}

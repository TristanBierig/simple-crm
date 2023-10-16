import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogDataService {
  countriesUrl: string = 'https://restcountries.com/v3.1/all?fields=name';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<{}> {
    return this.http.get<{}>(this.countriesUrl);
  }
}

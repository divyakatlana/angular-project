import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  getFilmsList() {
    return this.http.get(this.baseUrl + `films`);
  }

  getFilmsDetails(id: number) {
    return this.http.get(this.baseUrl + `films/${id}`);
  }

  getcharacterList() {
    return this.http.get(this.baseUrl + `people`);
  }

  getcharacterDetails(id: number) {
      return  this.http.get(this.baseUrl + `people/${id}`);  
  }
}

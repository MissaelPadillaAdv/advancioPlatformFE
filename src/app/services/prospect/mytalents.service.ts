import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:5000/api/v1/TalentProcess';

@Injectable({
  providedIn: 'root'
})
export class MytalentsService {

  constructor(private httpClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' },
    };
  }

  getTalentInProcess() {
    const url = base_url + `/GetTalentInProcess?page=1&take=10`;
    return this.httpClient.get(url,this.headers);
  }
}

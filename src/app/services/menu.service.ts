import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any[] = [];
  constructor(private httpClient: HttpClient) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' },
    };
  }

  getMenuByUser(){
    return this.httpClient.get('http://localhost:5000/api/v1/Permissions',this.headers).pipe(
      tap((resp :any) => {
        this.menu = resp.menu;
      })
    );
  }
}

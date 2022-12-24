import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:5000/api/v1/Wishlist';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' },
    };
  }

  getWishLists() {
    return this.httpClient.get(base_url,this.headers);
  }

  getTalentsByWishListsId(id: string){
    const url = `http://localhost:5000/api/v1/Wishlist/GetTalentsById/${id}`;
    return this.httpClient.get(url,this.headers);
  }

  create(formData: any){
    const url = `http://localhost:5000/api/v1/Wishlist`;
    return this.httpClient.post(url,formData,this.headers);
  }

  update(formData: any){
    const url = `http://localhost:5000/api/v1/Wishlist`;
    return this.httpClient.put(url,formData,this.headers);
  }


  deleteWishlist(id: string){
    const data = {
      id: id
    }
    const url = `http://localhost:5000/api/v1/Wishlist/Delete`;
    return this.httpClient.post(url,data,this.headers);
  }

  removeTalents(data: any){
    const url = `http://localhost:5000/api/v1/Wishlist/Talents/Remove`;
    return this.httpClient.post(url,data,this.headers);
  }

  moveTo(data: any) {
    const url = `http://localhost:5000/api/v1/Wishlist/Talents/MoveTo`; 
    return this.httpClient.put(url,data,this.headers);
  }

}

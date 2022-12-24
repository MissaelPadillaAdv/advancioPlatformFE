import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { JobPositionModel } from '../../models/prospect/jobpositions.model';

const base_url = 'http://localhost:5000/api/v1/JobPosition';
@Injectable({
  providedIn: 'root'
})
export class JobpositionService {

  constructor(private httpClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' },
    };
  }
  private generateJobPositionCollection(collection: JobPositionModel[]): JobPositionModel[] {
    const jobPosition = collection.map(
      (r) =>
        new JobPositionModel(
          r.id,
          r.name,
          r.username,
          r.assineeUsername,
          r.description,
          r.talentCount,
          r.isActive,
          r.identityName    
        )
    );
    return jobPosition;
  }

  getJobPositions(isActive: boolean, search: string = ''){
    let url = base_url + `?page=1&take=12&active=${isActive}`;
    url += search.length > 0 ? `&search=${search}` : '';
    console.log(url)
    return this.httpClient.get(url,this.headers).pipe(
      map( (resp: any) => {
        return this.generateJobPositionCollection(resp.items);
      })
    );
  }

  addJobPosition(formData: any){
    return this.httpClient.post(base_url,formData,this.headers);
  }

  deleteJobPosition(id: string){
    const data = {
      id: id
    };
    return this.httpClient.post(`${base_url}/Delete`,data,this.headers);
  }

  closeOpenJobPosition(id: string){
    const data = {
      id: id
    };
    return this.httpClient.post(`${base_url}/OnOff`,data,this.headers);
  }

  updateJobPosition(formData: any){
    return this.httpClient.put(`${base_url}`,formData,this.headers).pipe(
      tap(( resp: any) => {
        console.log(resp);
        return resp;
      }), 
      catchError((err) => {
        console.log(err);
        return of(err); })
    );
  }
}

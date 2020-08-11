import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LadangRestResult, Ladang } from './ladang';

@Injectable({
  providedIn: 'root'
})
export class LadangService {
  
  constructor(private http: HttpClient) { }

  findLadangDT(
    filter: string, sortColumn: string, sortDirection: string, pageNumber: number, pageSize: number
  ): Observable<LadangRestResult> {

    return this.http.get<LadangRestResult>('/api/v1/ladang/dt', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortColumn', sortColumn)
        .set('sortDirection', sortDirection)
        .set('searchInput', filter)
    })
    // .pipe(map(res => res['result']));
  }

  save(ladang: Ladang): Observable<Ladang> {
    return this.http.post<Ladang>('/api/v1/ladang', ladang);
  }

  delete(id: number) {
    return this.http.delete('/api/v1/ladang/'.concat(id.toString()));
  }

}

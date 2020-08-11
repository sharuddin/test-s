import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirektoriRestResult, Direktori  } from './direktori';

@Injectable({
  providedIn: 'root'
})
export class DirektoriService {
    findDirektoriDT(filter: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
        throw new Error("Method not implemented.");
    }
  
  constructor(private http: HttpClient) { }

  findLadangDT(
    filter: string, sortColumn: string, sortDirection: string, pageNumber: number, pageSize: number
  ): Observable<DirektoriRestResult> {

    return this.http.get<DirektoriRestResult>('/api/v1/direktori/dt', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortColumn', sortColumn)
        .set('sortDirection', sortDirection)
        .set('searchInput', filter)
    })
    // .pipe(map(res => res['result']));
  }

  save(direktori: Direktori): Observable<Direktori> {
    return this.http.post<Direktori>('/api/v1/direktori', direktori);
  }

  delete(id: number) {
    return this.http.delete('/api/v1/direktori/'.concat(id.toString()));
  }

}
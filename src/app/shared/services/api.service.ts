import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Data } from '../data';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiurl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getDatas(apiName, page, limit, select = '', sort = ''): Observable<any[]> {
    return this.http.get(`${this.apiurl}/${apiName}`, {
      params: new HttpParams()
        .set('select', select.toString())
        .set('sort', sort)
        .set('page', page.toString())
        .set('limit', limit.toString())
    }).pipe(
      map((res: any) => res)
    );
  }

  getData(id, apiName) {
    const data = this.http.get(`${this.apiurl}/${apiName}/${id}`).pipe(
      map((res: any) => res)
    );
    return data;
  }

  postData(data: any, apiName): Observable<any> {
    return this.http.post(`${this.apiurl}/${apiName}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(data: any, id, apiName): Observable<any> {
    return this.http.put(`${this.apiurl}/${apiName}/${id}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(id, apiName): Observable<any> {
    console.log(id, apiName)
    return this.http.delete(`${this.apiurl}/${apiName}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

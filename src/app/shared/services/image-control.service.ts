import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Data } from '../data';

@Injectable({ providedIn: 'root' })
export class ImageControlService {
    apiurl = `${environment.apiUrl}`;
    constructor(private http: HttpClient) { }

    getDatas(apiName, page?, limit?, sort?, size?): Observable<any[]> {
        return this.http.get(`${this.apiurl}/${apiName}`, {
            params: new HttpParams()
                .set('sort', sort)
                .set('page', page.toString())
                .set('limit', limit.toString())
                .set('size', size)
        }).pipe(
            map((res: any) => res)
        );
    }

    getData(id, apiName, page?, limit?, sort?, size?): Observable<any> {
        const data = this.http.get(`${this.apiurl}/${apiName}/${id}`, {
            params: {
                page,
                limit,
                sort, size
            }
        }).pipe(
            map((res: any) => res)
        );
        return data;
    }

    postData(data: any, apiName): Observable<any> {
        return this.http.post(`${this.apiurl}/${apiName}`, data);
    }

    updateData(data: any, id, apiName): Observable<any> {
        return this.http.put(`${this.apiurl}/${apiName}/${id}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteData(id, apiName): Observable<any> {
        return this.http.delete(`${this.apiurl}/${apiName}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        let msg = '';
        console.log(error.message);
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error}`;
        }
        return throwError(msg);
    }
}

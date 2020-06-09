import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDataService } from './shared-data.service';
import { NotificationService } from './notification.service';
@Injectable({
    providedIn: 'root'
})

export class FlickrService {
    //   headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        private noti: NotificationService,
        private http: HttpClient,
        private shared: SharedDataService,
        private sharedData: SharedDataService,
        public router: Router
    ) { }

    LoginFlickr() {

        // this.http.get(`${environment.apiUrl}/image/auth`).subscribe((res: any) => {
        //     // console.log(res.data)
        //     window.open(`${res.data.url}&signature=${res.data.signature}`, '_blank');
        // });

        // this.http.get(signinReq).pipe(map(res => res)).subscribe(data => { console.log(data) });
    }

    // Error
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

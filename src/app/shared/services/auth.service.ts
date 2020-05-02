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

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentUser = this._currentUser.asObservable();
  constructor(
    private noti: NotificationService,
    private http: HttpClient,
    private sharedData: SharedDataService,
    public router: Router
  ) { }

  // Sign-up
  signUp(user: any): Observable<any> {
    const api = `${environment.apiUrl}/auth/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: any) {
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/auth/login`, user).toPromise().then((res: any) => {
        // Success
        localStorage.setItem('access_token', JSON.stringify({ token: res.token, user: res.user }));
        if (localStorage.getItem('access_token') !== null) {
          this.sharedData.setLogged(true);
        }
        resolve();
      },
        err => {
          // Error
          reject(err);
        }
      );
    });
    return promise;
  }

  getUserToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${environment.apiUrl}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
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

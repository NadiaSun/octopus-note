import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FbAuthResponse, User } from './interfaces';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get status(): string {
    const expDate: Date = new Date(<string>localStorage.getItem('fb-auth-exp'))
    if (new Date > expDate) {
      this.logout();
      return ''
    }
    
    return localStorage.getItem('fb-auth-token') as string
  }
  
  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setStatus),
      catchError(this.errors.bind(this))
    )
  }

  logout() {
    this.setStatus(null)
  }

  statusAuthentication(): boolean {
    return !!this.status
  }


  register(user: User): Observable<any> {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
    .pipe(
      catchError(this.errors.bind(this))
    )
  }
  
  private errors(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error

    switch(message) {
      case 'EMAIL_EXISTS':
        this.error$.next('User with this email exists')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('User with this email not found')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Email is not correct')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Password is not correct')
        break
      case 'INVALID_LOGIN_CREDENTIALS':
          this.error$.next('Data is not correct')
          break
    }
    return throwError(error)
  }

  private setStatus(response: FbAuthResponse | null) {
    if(response) {
      console.log(response)
      const expDate: Date = new Date(new Date().getTime() + response.expiresIn * 1000)
      console.log(expDate)
      localStorage.setItem('fb-auth-token', response.idToken)
      localStorage.setItem('fb-auth-exp', expDate.toString())
    } else {
      localStorage.removeItem('fb-auth-token')
      localStorage.removeItem('fb-auth-exp')
    }

  }
}

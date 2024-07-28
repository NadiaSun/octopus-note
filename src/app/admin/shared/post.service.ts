import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { FbCreateResponse, Post } from './interfaces';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }

  add(post: Post): Observable<Post> {
    return this.http.post(`${environment.dataBaseUrl}posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }

  delete(key: string): Observable<void> {
    return this.http.delete<void>(`${environment.dataBaseUrl}posts/${key}.json`)
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.dataBaseUrl}posts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          if (!response) {
            return []
          }
          return Object.keys(response).map((key: string)=> ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        })
      )
  }

  checkAuth(post?: Post): boolean {
    if(!this.auth.statusAuthentication()) {
      this.auth.logout()
      this.router.navigate(['/'], {
        queryParams: {
          loginAgain: true
        }
      })
      
      return false
    }
    return true
  }
}

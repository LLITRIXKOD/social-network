import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  addUser(user: User): Observable<User> {
    user.id = Date.now();
    return this.http.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }
  updateUser(user: User): Observable<any>{
    return this.http.put(`${this.usersUrl}/${user.id}`, user, httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser(user: User): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return  (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}

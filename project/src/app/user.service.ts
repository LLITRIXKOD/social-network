import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';

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
  private users: User[];
  private usersSubject: Subject<User[]> = new Subject<User[]>();
  public users$ = this.usersSubject.asObservable();
  constructor(private http: HttpClient) { }

  loadUsers(): Observable<any> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(users => {
          this.users = users;
          this.usersSubject.next(this.users);
        }),
        delay(300),
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
        tap(_ => {
          this.users.push(user);
          this.usersSubject.next(this.users);
        }),
        catchError(this.handleError('addUser', user))
      );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user, httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  filterUsers(search: string): void {
    const foundUsers = this.users.filter((item) => {
      const note = `${item.firstName} ${item.lastName}`;
      const position = note.toUpperCase().indexOf(search.toUpperCase());
      if (position >= 0) {
        return item.id;
      }
    });
      if (foundUsers.length !== 0) {
        this.usersSubject.next(foundUsers);
      } else {
        this.usersSubject.next(null);
      }
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return  (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, Subject, Subscription} from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import {UserOfSystem} from './user-of-system';

const httpOptions: object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string = 'http://localhost:3000/users';
  private usersOfSystemUrl: string = 'http://localhost:3000/usersOfSystem';
  private users: User[];
  private usersSubject: Subject<User[]> = new Subject<User[]>();
  public users$: Observable<User[]> = this.usersSubject.asObservable();
  constructor(private http: HttpClient) { }

  public loadUsers (): Observable<any> {
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
  public getUser (id: number): Observable<User> {
    const url: string = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  public addUser (user: User): Observable<User> {
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
  public updateUser (user: User): Observable<any> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user, httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
  public deleteUser (user: User | number): Observable<User> {
    const id: number = typeof user === 'number' ? user : user.id;
    const url: string = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  public filterUsers (search: string): void {
    const foundUsers: User[] = this.users.filter((item) => {
      const note: string = `${item.firstName} ${item.lastName}`;
      const position: number = note.toUpperCase().indexOf(search.toUpperCase());
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
  public logInUser(user: UserOfSystem): Observable<UserOfSystem> {
    return this.http.get<UserOfSystem> (
      `${this.usersOfSystemUrl}?email=${user.email}&password=${user.password}`
    ).pipe (
        catchError(this.handleError('getUsersOfSystem', []))
      );
  }
  private handleError<T> (operation: string = 'operation', result?: T): any {
    return  (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

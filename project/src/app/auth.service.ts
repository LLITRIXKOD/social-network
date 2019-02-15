import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAdmin: boolean = true;
  public loggedIn: boolean = true;
}

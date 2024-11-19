import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api : ApiService, private _auth : AuthService) {
  }

  static CurrentUser : User;

  static checkUser = () => localStorage.getItem("user") !== null;

  createNewUserJson(inputUser: any) {
    var toReturn = new User;
    toReturn.id = inputUser.user_id;
    toReturn.email = inputUser.email;
    toReturn.username = inputUser.username;

    return toReturn;
  }

  userToJson(user: User) {
    return {
      "email" : user.email,
      "username": user.username
    };
  }

  getUser() : Observable<User> {
    return this._api.getTypeRequest(`user/me/`).pipe(map(res => this.createNewUserJson(res)));
  }

  deleteUser(id: number) {
    return this._api.deleteTypeRequest(`users/${id}`);
  }

  login(email: string, password: string) {

    const body = new HttpParams()
    .set('username', email)
    .set('password', password)
    .set('grant_type', 'password')
    
    return this._api.postTypeRequest('login', body, 'application/x-www-form-urlencoded');
  }

  register(user: User, password: string) {
    const body = new HttpParams()
    .set('username', user.email)
    .set('password', password)
    .set('grant_type', 'password')
    .set('name', user.username)
    
    return this._api.postTypeRequest('register', body, 'application/x-www-form-urlencoded');
  }
}

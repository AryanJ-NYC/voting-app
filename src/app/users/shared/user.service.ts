import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private apiRoot: string;
  private usersRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.usersRoute = this.apiRoot + '/users';
  }

  private errorHandler (error: any) {
    console.error(error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errMsg);
  }

  addUser(user: User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.usersRoute, body, options)
               .map(res => res.json())
               .catch(err => Observable.throw(err.json()));
  }
}

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {
  private apiRoot: string;
  private usersRoute: string;
  private sessionsRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.usersRoute = this.apiRoot + '/users';
    this.sessionsRoute = this.apiRoot + '/sessions';
  }

  login(user: User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.sessionsRoute, body, options)
                .map(res => res.json())
                .catch(err => Observable.throw(err.json()));
  }

  addUser(user: User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.usersRoute, body, options)
               .map(res => res.json())
               .catch(err => Observable.throw(err.json()));
  }

  getSession(): Observable<User> {
    return this.http.get(this.sessionsRoute)
               .map(res => res.json())
               .catch(err => Observable.throw(err.json()));
  }

  destroySession(): Observable<void> {
    return this.http.delete(this.sessionsRoute)
               .map(() => null)
               .catch(err => Observable.throw(err.json()));
  }
}

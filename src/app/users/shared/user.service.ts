import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class UserService {
  // Observable string sources
  private userLoggedInSource = new BehaviorSubject<User>();

  // Observable string streams
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  private apiRoot: string;
  private usersRoute: string;
  private sessionsRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.usersRoute = this.apiRoot + '/users';
    this.sessionsRoute = this.apiRoot + '/sessions';
  }

  broadcastUser(user: User): void {
    this.userLoggedInSource.next(user);
  }

  getCurrentUser(): User {
    return this.userLoggedInSource.getValue();
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
               .catch(err => Observable.throw(err));
  }

  destroySession(): Observable<void> {
    return this.http.delete(this.sessionsRoute)
               .map(() => null)
               .catch(err => Observable.throw(err.json()));
  }
}

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Option, Poll } from './poll.model';

@Injectable()
export class PollService {

  // Observable string sources
  private pollCreatedSource = new Subject<Poll>();

  // Observable string streams
  pollCreated$ = this.pollCreatedSource.asObservable();

  private apiRoot: string;
  private pollsRoute: string;
  private usersRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.pollsRoute = this.apiRoot + '/polls';
    this.usersRoute = this.apiRoot + '/users'
  }

  broadcastPoll(poll: Poll): void {
    this.pollCreatedSource.next(poll);
  }

  create(poll: Poll): Observable<Poll> {
    let body = JSON.stringify(poll);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.pollsRoute, body, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  getAll(): Observable<Poll[]> {
    return this.http.get(this.pollsRoute)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  getById(id: string): Observable<Poll> {
    return this.http.get(`${this.pollsRoute}/${id}`)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  getPollsByUserID(userId: string): Observable<Poll[]> {
    return this.http.get(`${this.usersRoute}/${userId}/polls`)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  deleteById(id: string): Observable<Response> {
    return this.http.delete(`${this.pollsRoute}/${id}`)
        .map(res => res);
  }

  addOption(pollId: string, option: Option): Observable<Option> {
    let body = JSON.stringify(option);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.pollsRoute}/${pollId}/options`, body, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  addVote(pollId: string, optionId: string): Observable<Poll> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.pollsRoute}/${pollId}/options/${optionId}/vote`, null, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }

  canVote(pollId: string): Observable<boolean> {
    return this.http.get(`${this.pollsRoute}/${pollId}/canVote`)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }
}

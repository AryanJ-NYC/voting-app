import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Poll } from './poll.model';

@Injectable()
export class PollService {

  // Observable string sources
  private pollCreatedSource = new Subject<Poll>();

  // Observable string streams
  pollCreated$ = this.pollCreatedSource.asObservable();

  private apiRoot: string;
  private pollsRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.pollsRoute = this.apiRoot + '/polls';
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

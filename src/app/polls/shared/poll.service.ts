import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Poll } from './poll';

@Injectable()
export class PollService {
  private apiRoot: string;
  private pollsRoute: string;

  constructor(private http: Http) {
    this.apiRoot = '/api';
    this.pollsRoute = this.apiRoot + '/polls';
  }

  create(poll: Poll): Observable<Poll> {
    let body = JSON.stringify(poll);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.pollsRoute, body, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()));
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Injectable()
export class PollDetailResolve implements Resolve<Poll> {
  constructor(private pollService: PollService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | boolean {
    let id = route.params['id'];

    return Observable.forkJoin(
      this.pollService.getById(id)
          .map(poll => {
            if (poll) {
              return poll;
            } else {
              console.log('NOT FOUND!'); // TODO reroute
            }
          },
          err => {
            console.error(err);
          }),
      this.pollService.canVote(id).map(canVote => canVote)
    );
  }
}

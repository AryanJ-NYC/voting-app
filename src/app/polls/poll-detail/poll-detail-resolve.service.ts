import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';
import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Injectable()
export class PollDetailResolve implements Resolve<Poll> {
  constructor(
    private pollService: PollService,
    private userService: UserService
  ) { }

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
          }),
      this.pollService.canVote(id).map(canVote => canVote),
      this.userService.getSession().map(user => {
        if (user) {
          return user;
        }
      }).catch((err, caught) => {
        return [new User()];
      })
    );
  }
}

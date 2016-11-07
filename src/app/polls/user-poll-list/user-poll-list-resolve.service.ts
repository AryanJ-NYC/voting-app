import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../shared/poll.model';
import { User } from '../../users/shared/user.model';
import { PollService } from '../shared/poll.service';
import { UserService } from '../../users/shared/user.service';

@Injectable()
export class UserPollListResolve implements Resolve<Poll[]> {
  private user: User;
  constructor(
    private pollService: PollService,
    private userService: UserService
  ) { }

  resolve(): Observable<any> | boolean {
    let sessionObservable = this.userService.getSession()
      .map(user => {
        if (user) {
          this.user = user;
          return user;
        } else {
          console.error("USER NOT FOUND");
        }
      });

    return sessionObservable.switchMap((user) => {
      return this.pollService.getPollsByUserID(user._id)
        .map(polls => {
          return { user, polls };
        })
    })
  }
}
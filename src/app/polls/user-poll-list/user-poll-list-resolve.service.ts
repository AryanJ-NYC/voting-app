import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Poll } from '../shared/poll.model';
import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Injectable()
export class UserPollListResolve implements Resolve<Poll[]> {
  private user: User;
  constructor(private userService: UserService) { }

  resolve(): Observable<User> | boolean {
    return this.userService.getSession()
        .map(user => {
          if (user) {
            this.user = user;
            return user;
          } else {
            console.error("USER NOT FOUND");
          }
        });
  }
}
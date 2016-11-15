import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { NavService } from '../../shared/nav/shared/nav.service';
import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';
import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: [ './poll-list.component.css' ]
})

export class PollListComponent implements OnInit {
  private polls: Poll[];
  private user: User;

  private pollSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private navService: NavService,
    private pollService: PollService,
    private userService: UserService,
    private router: Router
  ) {
    this.pollSubscription = pollService.pollCreated$.subscribe(
      poll => {
        this.polls.push(poll);
      });

    this.userSubscription = userService.userLoggedIn$.subscribe(
      user => { this.user = user; },
      err => { console.error(err); }
    );
  }

  ngOnInit(): void {
    this.getPolls();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.pollSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private goToPollDetail(poll: Poll): void {
    let link = ['/polls', poll._id];
    this.router.navigate(link);
  }

  private openLoginModal(): void {
    this.navService.openLoginModal(true);
  }

  private getPolls(): void {
    this.pollService.getAll()
      .subscribe(
        polls => {
          this.polls = polls;
        },
        err => {
          console.error(err);
        }
      );
  }

  private getUser(): void {
    this.user = this.userService.getCurrentUser();
  }
}

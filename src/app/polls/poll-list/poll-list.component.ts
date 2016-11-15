import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private navService: NavService,
    private pollService: PollService,
    private userService: UserService,
    private router: Router
  ) {
    pollService.pollCreated$.subscribe(
      poll => {
        this.polls.push(poll);
      });

    userService.userLoggedIn$.subscribe(
      user => { this.user = user; },
      err => { console.error(err); }
    )
  }

  private goToPollDetail(poll: Poll): void {
    let link = ['/polls', poll._id];
    this.router.navigate(link);
  }

  private openLoginModal(): void {
    this.navService.openLoginModal(true);
  }

  ngOnInit(): void {
    this.getPolls();
  }

  getPolls(): void {
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
}

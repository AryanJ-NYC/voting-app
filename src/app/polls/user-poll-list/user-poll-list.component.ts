import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { Poll } from '../shared/poll.model';
import { User } from '../../users/shared/user.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'user-poll-list',
  templateUrl: './user-poll-list.component.html'
})

export class UserPollListComponent implements OnInit {
  private user: User;
  private polls: Poll[];

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService
  ) { }

  ngOnInit(): void {
    this.route.data.forEach((data: { user: User }) => {
      this.user = data.user;
    });

    this.pollService.getPollsByUserID(this.user._id)
        .subscribe(polls => {
          this.polls = polls;
        });
  }
}

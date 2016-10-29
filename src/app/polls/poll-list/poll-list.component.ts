import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})

export class PollListComponent implements OnInit {
  private polls: Poll[];

  constructor(
    private router: Router,
    private pollService: PollService
  ) {
    pollService.pollCreated$.subscribe(
      poll => {
        this.polls.push(poll);
      });
  }

  private goToPollDetail(poll: Poll): void {
    let link = ['/polls', poll._id];
    this.router.navigate(link);
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

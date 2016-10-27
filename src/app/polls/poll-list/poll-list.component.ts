import { Component, OnInit } from '@angular/core';

import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})

export class PollListComponent implements OnInit {
  private polls: Poll[];

  constructor(private pollService: PollService) {
    pollService.pollCreated$.subscribe(
      poll => {
        this.polls.push(poll);
      });
  }

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
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

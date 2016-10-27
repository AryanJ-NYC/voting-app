import { Component, OnInit } from '@angular/core';

import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})

export class PollListComponent implements OnInit {
  private polls: Poll[];

  constructor(private pollService: PollService) { }

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

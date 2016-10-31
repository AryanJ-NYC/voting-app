import { Component, Input, OnInit } from '@angular/core';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-chart',
  templateUrl: './poll-chart.component.html'
})

export class PollChartComponent {
  @Input() private poll: Poll = new Poll();
  private votes: number[];
  private optionNames: string[];

  constructor(pollService: PollService) {
    pollService.pollCreated$.subscribe(
        poll => {
          this.poll = poll;
          this.votes = [];
          this.optionNames = [];
          for (let option of this.poll.options) {
            this.votes.push(option.votes.length);
            this.optionNames.push(option.name);
          }
        });
  }
}

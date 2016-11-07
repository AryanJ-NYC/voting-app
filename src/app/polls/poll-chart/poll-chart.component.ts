import { Component, Input, OnChanges } from '@angular/core';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-chart',
  templateUrl: './poll-chart.component.html'
})

export class PollChartComponent implements OnChanges {
  @Input() private poll: Poll;
  private votes: number[];
  private optionNames: string[];

  constructor(private pollService: PollService) {
    pollService.pollCreated$.subscribe(
        poll => {
          this.poll = poll;
          this.setOptionNames();
          this.setVotes();
        });
  }

  ngOnChanges(): void {
    if (this.poll) {
      this.setOptionNames();
      this.setVotes();
    }
  }

  private setOptionNames(): void {
    this.optionNames = this.poll.options.map(function (option) {
      return option.name;
    });
  }

  private setVotes(): void {
    this.votes = this.poll.options.map(function (option) {
      return option.votes.length;
    });
  }
}

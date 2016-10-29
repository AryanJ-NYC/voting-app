import { Component, Input } from '@angular/core';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-options',
  templateUrl: './poll-options.component.html'
})

export class PollOptionsComponent {
  @Input() poll: Poll;
  @Input() optionId: string;
  private votes: string[];

  constructor(private pollService: PollService) { }

  vote(): void {
    this.pollService.addVote(this.poll._id, this.optionId)
        .subscribe(
          votes => this.votes = votes,
          error => console.error(error)
        );
  }
}

import { Component, Input } from '@angular/core';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-options',
  templateUrl: './poll-options.component.html'
})

export class PollOptionsComponent {
  @Input() canVote: boolean;
  @Input() poll: Poll;
  @Input() optionId: string;

  constructor(private pollService: PollService) { }

  vote(): void {
    this.pollService.addVote(this.poll._id, this.optionId)
        .subscribe(
          poll => {
            this.poll = poll;
            this.sharePoll(this.poll);
            this.canVote = false;
          },
            error => console.error(error)
        );
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }
}

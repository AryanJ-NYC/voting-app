import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() onVoted = new EventEmitter<boolean>();
  private newOptionName: string;

  constructor(private pollService: PollService) {
    this.canVote = true;
  }

  private isNewOptionName(): boolean {
    if (this.newOptionName && this.newOptionName.length > 0) return true;
    return null;
  }

  private isOptionSelected(): boolean {
    if (this.optionId && this.optionId != 'other' && this.optionId.length > 0) return true;
    return null;
  }

  private vote(): void {
    let addVoteObserver = (poll: Poll) => {
            this.poll = poll;
            this.sharePoll(this.poll);
            this.onVoted.emit(true);
            this.canVote = false;
          };
    let addOptionObservable = this.pollService.addOption(this.poll._id, { name: this.newOptionName });

    // add new option then vote if new option filled
    if (this.newOptionName) {
      addOptionObservable.subscribe(
            option => {
              this.optionId = option._id;
              this.newOptionName = null;
            },
            err => console.error(err),
            () => {
              this.pollService.addVote(this.poll._id, this.optionId).subscribe(addVoteObserver)
            }
          );
    } else {
      this.pollService.addVote(this.poll._id, this.optionId).subscribe(addVoteObserver)
    }
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }
}

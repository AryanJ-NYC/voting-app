import { Component, Input } from '@angular/core';

import { Poll } from '../shared/poll.model';

@Component({
  moduleId: module.id,
  selector: 'poll-options',
  templateUrl: './poll-options.component.html'
})

export class PollOptionsComponent {
  @Input() poll: Poll;
  @Input() optionId: string;

  private vote(): void {
    console.log(this.optionId);
  }
}

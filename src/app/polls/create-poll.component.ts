import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

import { Poll } from './shared/poll';
import { PollService } from './shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'create-poll',
  templateUrl: './create-poll.component.html'
})

export class CreatePollComponent {
  @ViewChild('createPollModal') createPollModal: ModalDirective;
  private errorMessage: string;
  @Input() poll: Poll = new Poll();

  constructor(private pollService: PollService) {
    let newOption = { name: '' };
    this.poll.options = [ newOption ];
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }

  createPoll() {
    this.pollService.create(this.poll)
        .subscribe(poll => {
          if (poll.hasOwnProperty('_id')) {
            this.poll = poll;
            this.sharePoll(this.poll);
            this.createPollModal.hide();
          }
        }, error => {
          this.errorMessage = error.message;
        });
  }

  showModal(): void {
    this.createPollModal.show();
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}

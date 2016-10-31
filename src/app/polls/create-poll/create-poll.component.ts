import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: [ './create-poll.component.css' ]
})

export class CreatePollComponent {
  @ViewChild('createPollModal') createPollModal: ModalDirective;
  private errorMessage: string;
  @Input() poll: Poll = new Poll();

  constructor(private pollService: PollService) {
    this.poll.options = [ { name: '' }, { name: '' } ];
  }

  private addOption(): void {
    this.poll.options.push({ name: '' });
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
    this.poll = new Poll();
    this.poll.options = [ { name: '' }, { name: '' } ];
    this.createPollModal.show();
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}

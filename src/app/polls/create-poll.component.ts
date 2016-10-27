import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

import { Poll } from './poll';

@Component({
  moduleId: module.id,
  selector: 'create-poll',
  templateUrl: './create-poll.component.html'
})

export class CreatePollComponent {
  @ViewChild('createPollModal') createPollModal: ModalDirective;
  private errorMessage: string;
  @Input() poll: Poll = new Poll();

  showModal(): void {
    this.createPollModal.show();
  }
}

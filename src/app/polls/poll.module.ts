import { AlertModule } from 'ng2-bootstrap/components/alert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgModule } from '@angular/core';

import { CreatePollComponent } from './create-poll.component';
import { PollListComponent } from './poll-list/poll-list.component';

@NgModule({
  imports: [ AlertModule, CommonModule, FormsModule, ModalModule ],
  declarations: [ CreatePollComponent, PollListComponent ],
  exports: [ CreatePollComponent, PollListComponent ]
})

export class PollModule { }

import { AlertModule } from 'ng2-bootstrap/components/alert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgModule } from '@angular/core';

import { CreatePollComponent } from './create-poll/create-poll.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollOptionsComponent } from './poll-options/poll-options.component';

@NgModule({
  imports: [ AlertModule, CommonModule, FormsModule, ModalModule ],
  declarations: [ CreatePollComponent, PollDetailComponent, PollListComponent, PollOptionsComponent ],
  exports: [ CreatePollComponent, PollDetailComponent, PollListComponent ]
})

export class PollModule { }

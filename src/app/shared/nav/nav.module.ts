import { AlertModule } from 'ng2-bootstrap/components/alert';
import { CollapseModule } from 'ng2-bootstrap/components/collapse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { LoginModalComponent } from './login/login.component';
import { NavComponent } from './nav.component';
import { PollModule } from '../../polls/poll.module';
import { PollListComponent } from '../../polls/poll-list/poll-list.component';
import { SignupModalComponent } from './signup/signup.component';
import { UserPollListComponent } from '../../polls/user-poll-list/user-poll-list.component';
import { UserPollListResolve } from '../../polls/user-poll-list/user-poll-list-resolve.service';

@NgModule({
  imports: [
    AlertModule,
    CollapseModule,
    CommonModule,
    FormsModule,
    ModalModule,
    PollModule,
    RouterModule.forChild([
      { path: 'polls', component: PollListComponent },
      { path: 'my-polls', component: UserPollListComponent, resolve: { user: UserPollListResolve } }
    ])
  ],
  declarations: [ LoginModalComponent, NavComponent, SignupModalComponent ],
  exports: [ NavComponent ]
})

export class NavModule { }

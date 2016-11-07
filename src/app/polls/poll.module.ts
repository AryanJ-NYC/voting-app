import { AlertModule } from 'ng2-bootstrap/components/alert';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { CreatePollComponent } from './create-poll/create-poll.component';
import { PollChartComponent } from './poll-chart/poll-chart.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PollDetailResolve } from './poll-detail/poll-detail-resolve.service';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollOptionsComponent } from './poll-options/poll-options.component';
import { UserPollListComponent } from "./user-poll-list/user-poll-list.component";

@NgModule({
  imports: [
    AlertModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    ModalModule,
    RouterModule.forChild([{ path: 'polls/:id', component: PollDetailComponent, resolve: { data: PollDetailResolve } }]),
    ToastModule
  ],
  declarations: [
    CreatePollComponent,
    PollChartComponent,
    PollDetailComponent,
    PollListComponent,
    PollOptionsComponent,
    UserPollListComponent
  ],
  exports: [ CreatePollComponent, PollDetailComponent, PollListComponent ]
})

export class PollModule { }

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import './rxjs-operators';

import { AppComponent }  from './app.component';
import { NavModule } from './shared/nav/nav.module';
import { PollDetailComponent } from './polls/poll-detail/poll-detail.component';
import { PollDetailResolve } from './polls/poll-detail/poll-detail-resolve.service';
import { PollListComponent } from './polls/poll-list/poll-list.component';
import { PollModule } from './polls/poll.module';
import { PollService } from './polls/shared/poll.service';
import { UserService } from './users/shared/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NavModule,
    PollModule,
    RouterModule.forRoot([
      { path: 'polls/:id', component: PollDetailComponent, resolve: { poll: PollDetailResolve }},
      { path: 'polls', component: PollListComponent },
      { path: '', redirectTo: '/polls', pathMatch: 'full' },
    ])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ PollDetailResolve, PollService, UserService ]
})

export class AppModule { }

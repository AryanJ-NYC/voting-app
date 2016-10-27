import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import './rxjs-operators';

import { AppComponent }  from './app.component';
import { PollListComponent } from './polls/poll-list/poll-list.component';
import { NavModule } from './shared/nav/nav.module';
import { PollModule } from './polls/poll.module';
import { PollService } from './polls/shared/poll.service';
import { UserService } from './users/shared/user.service';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    NavModule,
    PollModule,
    RouterModule.forRoot([
      { path: '', component: PollListComponent }
    ])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ PollService, UserService ]
})

export class AppModule { }

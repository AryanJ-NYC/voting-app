import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Poll } from '../shared/poll';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-detail',
  templateUrl: './poll-detail.component.html'
})

export class PollDetailComponent {
  @Input() private poll: Poll;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute
  ) { }
}

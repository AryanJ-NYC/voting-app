import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-detail',
  templateUrl: './poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  private canVote: boolean;
  private errorMessage: string;
  private poll: Poll = new Poll();

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private toastr: ToastsManager
  ) { }

  ngOnInit(): void {
    this.route.data.forEach((data: { poll: Poll }) => {
      this.poll = data.poll;
      this.sharePoll(this.poll);
    });
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }

  private showSuccessToast(isVoteSuccess: boolean): void {
    if (isVoteSuccess) {
      this.toastr.success('Vote Submitted', 'Success!', { dismiss: 'auto', showCloseButton: true });
    }
  }
}

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
  private poll: Poll;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private toastr: ToastsManager
  ) { }

  ngOnInit(): void {
    this.route.data.forEach((data: { poll: Poll }) => {
      this.poll = data.poll;
      this.sharePoll(this.poll);

      this.pollService.canVote(this.poll._id)
          .subscribe(
            canVote => {
              this.canVote = canVote;

              if (this.canVote) {
                this.errorMessage = '';
              } else {
                this.errorMessage = 'You have already voted for this poll.';
              }
            },
            err => {
              console.error(err);
            });
    });
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }

  private displayVoteSuccess(isVoteSuccess: boolean): void {
    if (isVoteSuccess) {
      this.toastr.success('Vote Submitted', 'Success!', { dismiss: 'auto', toastLife: 1000, showCloseButton: true });
      this.errorMessage = 'You have already voted for this poll.';
    }
  }
}

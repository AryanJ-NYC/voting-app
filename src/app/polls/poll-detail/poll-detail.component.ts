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
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.pollService.getById(id)
          .subscribe(
            poll => {
              this.poll = poll;
              this.sharePoll(this.poll);
            },
            error => console.error(error),
            () => {
              this.pollService.canVote(this.poll._id)
                  .subscribe(
                    canVote => {
                      this.canVote = canVote;
                      if (!this.canVote)
                        this.errorMessage = "You already voted in this poll."
                    },
                    error => console.error(error)
                  )
            }
          )
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

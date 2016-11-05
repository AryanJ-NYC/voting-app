import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';
import { User } from "../../users/shared/user.model";
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'poll-detail',
  templateUrl: './poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  private canVote: boolean;
  private errorMessage: string;
  private poll: Poll;
  private user: User;

  constructor(
    private location: Location,
    private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    private userService: UserService
  ) {
    userService.userLoggedIn$.subscribe(user => { this.user = user; })
  }

  ngOnInit(): void {
    this.route.data.forEach((element: {data: Array<any>}) => {
      this.poll = element.data[0];
      this.sharePoll(this.poll);

      this.canVote = element.data[1];

      if (this.canVote) {
        this.errorMessage = '';
      } else {
        this.errorMessage = 'You have already voted for this poll.';
      }

      this.user = element.data[2];
    });
  }

  private deletePoll(): void {
    if (confirm('Are you sure?')) {
      this.pollService.deleteById(this.poll._id)
          .subscribe(res => {
            if (res.ok) {
              this.toastr.success('Poll deleted', 'Success!', {toastLife: 1000, showCloseButton: true});
              this.router.navigate(['/polls']);
            }
          });
    }
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }

  private displayVoteSuccess(isVoteSuccess: boolean): void {
    if (isVoteSuccess) {
      this.toastr.success('Vote Submitted', 'Success!', { toastLife: 1000, showCloseButton: true });
      this.errorMessage = 'You have already voted for this poll.';
    }
  }
}

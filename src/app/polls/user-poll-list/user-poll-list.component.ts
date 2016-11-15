import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Poll } from '../shared/poll.model';
import { User } from '../../users/shared/user.model';
import { PollService } from '../shared/poll.service';

@Component({
  moduleId: module.id,
  selector: 'user-poll-list',
  templateUrl: './user-poll-list.component.html',
  styleUrls: [ './user-poll-list.component.css' ]
})

export class UserPollListComponent implements OnInit {
  private user: User;
  private polls: Poll[];

  constructor(
      private location: Location,
      private pollService: PollService,
      private route: ActivatedRoute,
      private toastr: ToastsManager
  ) { }

  ngOnInit(): void {
    this.route.data.forEach((element: {data: { polls: Array<Poll>, user: User }}) => {
      this.polls = element.data.polls;
      this.user = element.data.user;
    });
  }

  private deletePoll(poll: Poll) {
    if (confirm('Are you sure?')) {
      this.pollService.deleteById(poll._id)
          .subscribe(res => {
            if (res.ok) {
              this.toastr.success('Poll deleted', 'Success!', { toastLife: 1000, showCloseButton: true });
              let pollToDelete = this.polls.findIndex(function (pPoll) {
                return pPoll._id == poll._id;
              });
              this.polls.splice(pollToDelete, 1);
            }
          });
    }
  }
}

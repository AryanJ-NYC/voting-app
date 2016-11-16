import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { NavService } from '../../shared/nav/shared/nav.service';
import { Poll } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';
import { User } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'poll-options',
  templateUrl: './poll-options.component.html',
  styleUrls: [ './poll-options.component.css' ]
})

export class PollOptionsComponent implements OnInit, OnDestroy {
  @Input() canVote: boolean;
  @Input() poll: Poll;
  @Input() optionId: string;
  @Output() onVoted = new EventEmitter<boolean>();
  private newOptionName: string;
  private user: User;
  private userSubscription: Subscription;

  constructor(
      private navService: NavService,
      private pollService: PollService,
      private userService: UserService
  ) {
    this.canVote = true;

    this.userSubscription = userService.userLoggedIn$.subscribe(
        user => {
          this.user = user;
          this.newOptionName = ''; // in case of logout, clear newOptionName
        },
        err => { console.error(err); }
    );
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private getUser(): void {
    this.user = this.userService.getCurrentUser();
  }

  private openLoginModal(): void {
    this.navService.openLoginModal(true);
  }

  private isNewOptionName(): boolean {
    if (this.newOptionName && this.newOptionName.length > 0) return true;
    return null;
  }

  private isOptionSelected(): boolean {
    if (this.optionId && this.optionId != 'other' && this.optionId.length > 0) return true;
    return null;
  }

  private vote(): void {
    let addVoteObserver = (poll: Poll) => {
            this.poll = poll;
            this.sharePoll(this.poll);
            this.onVoted.emit(true);
            this.canVote = false;
          };
    let addOptionObservable = this.pollService.addOption(this.poll._id, { name: this.newOptionName });

    // add new option then vote if new option filled
    if (this.newOptionName) {
      addOptionObservable.subscribe(
            option => {
              this.optionId = option._id;
              this.newOptionName = null;
            },
            err => console.error(err.message),
            () => {
              this.pollService.addVote(this.poll._id, this.optionId).subscribe(addVoteObserver)
            }
          );
    } else {
      // otherwise, vote for chosen option
      this.pollService.addVote(this.poll._id, this.optionId).subscribe(addVoteObserver)
    }
  }

  private sharePoll(poll: Poll): void {
    this.pollService.broadcastPoll(poll);
  }
}

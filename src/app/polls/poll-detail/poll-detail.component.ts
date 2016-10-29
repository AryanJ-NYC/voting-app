import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.pollService.getById(id)
          .subscribe(
            poll => this.poll = poll,
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
}

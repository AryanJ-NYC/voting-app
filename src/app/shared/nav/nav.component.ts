import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "../../users/shared/user";
import { CreatePollComponent } from '../../polls/create-poll/create-poll.component';
import { LoginModalComponent } from './login-modal.component';
import { SignupModalComponent } from './signup-modal.component';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: [ './nav.component.css' ]
})

export class NavComponent implements OnInit {
  private isCollapsed: boolean = true;
  @ViewChild(CreatePollComponent) createPollModal: CreatePollComponent;
  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;
  @ViewChild(SignupModalComponent) signupModal: SignupModalComponent;
  private user: User;
  private fetchingUserData = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getSession()
      .subscribe(
        user => {
          if (user.hasOwnProperty('_id')) {
            this.user = user;
          }
          this.fetchingUserData = false;
        },
        error => {
          this.user = null;
          this.fetchingUserData = false;
        }
      );
  }

  changeUser(user: User) {
    this.user = user;
  }

  showCreatePollModal(): void {
    this.createPollModal.showModal();
  }

  showLoginModal(): void {
    this.loginModal.showModal();
  }

  showSignupModal(): void {
    this.signupModal.showModal();
  }

  logout(): void {
    this.userService.destroySession().subscribe(
      () => {
        this.user = null;
      });
  }
}

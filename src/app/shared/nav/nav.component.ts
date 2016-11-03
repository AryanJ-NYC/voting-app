import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { User } from "../../users/shared/user.model";
import { CreatePollComponent } from '../../polls/create-poll/create-poll.component';
import { LoginModalComponent } from './login/login.component';
import { SignupModalComponent } from './signup/signup.component';
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
    private toastr: ToastsManager,
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
        this.toastr.success('Logged Out', 'Success!', { dismiss: 'auto', toastLife: 1000, showCloseButton: true });
      });
  }
}

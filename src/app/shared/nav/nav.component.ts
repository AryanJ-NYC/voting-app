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

  ngOnInit(): void {
    this.userService.getSession()
      .subscribe(
        user => {
          if (user.hasOwnProperty('_id')) {
            this.user = user;
            this.userService.broadcastUser(this.user);
          }
          this.fetchingUserData = false;
        },
        () => {
          this.user = null;
          this.fetchingUserData = false;
        }
      );
  }

  private changeUser(user: User): void {
    this.user = user;
  }

  private collapseNav(): void {
    this.isCollapsed = true;
  }

  private showCreatePollModal(): void {
    this.createPollModal.showModal();
  }

  private showLoginModal(): void {
    this.loginModal.showModal();
  }

  private showSignupModal(): void {
    this.signupModal.showModal();
  }

  private logout(): void {
    this.userService.destroySession().subscribe(
      () => {
        this.user = null;
        this.userService.broadcastUser(this.user);
        this.toastr.success('Logged Out', 'Success!', { dismiss: 'auto', toastLife: 1000, showCloseButton: true });
      });
  }
}

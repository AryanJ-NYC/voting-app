import { Component, ViewChild } from '@angular/core';

import { User } from "../../users/shared/user";
import { LoginModalComponent } from "./login-modal.component";
import { SignupModalComponent } from "./signup-modal.component";

@Component({
  moduleId: module.id,
  selector: 'navigation',
  templateUrl: './nav.component.html'
})

export class NavComponent {
  private isCollapsed: boolean = true;
  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;
  @ViewChild(SignupModalComponent) signupModal: SignupModalComponent;
  private user: User;

  changeUser(user: User) {
    this.user = user;
  }

  showLoginModal(): void {
    this.loginModal.showModal();
  }

  showSignupModal(): void {
    this.signupModal.showModal();
  }
}

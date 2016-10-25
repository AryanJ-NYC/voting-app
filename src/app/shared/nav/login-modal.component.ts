import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { User } from '../../users/shared/user';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login-modal.component.html'
})

export class LoginModalComponent {
  @Input() user: User = new User();
  @Output() onSubmitted = new EventEmitter<User>();
  @ViewChild('loginModal') loginModal;
  private errorMessage: string;

  constructor (private userService: UserService) { }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        user => {
          if (user.hasOwnProperty('_id')) {
            this.user = user;
            this.onSubmitted.emit(user);
          }
        },
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  showModal(): void {
    this.loginModal.show();
  }
}

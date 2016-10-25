import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../users/shared/user';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'signup-modal',
  templateUrl: './signup-modal.component.html'
})

export class SignupModalComponent {
  @Input() user: User = new User();
  @Output() onSubmitted = new EventEmitter<User>();
  private errorMessage: string;
  private confirmPassword: string;

  constructor (private userService: UserService) { }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  signup() {
    if (this.user.password == this.confirmPassword) {
      this.userService.addUser(this.user)
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
    } else {
      this.errorMessage = 'Passwords do not match.';
    }
  }
}

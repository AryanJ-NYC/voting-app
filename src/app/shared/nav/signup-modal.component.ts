import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

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
  @ViewChild('signupModal') signupModal: ModalDirective;
  private errorMessage: string;
  private confirmPassword: string;

  constructor (private userService: UserService) { }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  signup(): void {
    if (this.user.password == this.confirmPassword) {
      this.userService.addUser(this.user)
        .subscribe(
          user => {
            if (user.hasOwnProperty('_id')) {
              this.onSubmitted.emit(user);
              this.user = new User();
              this.confirmPassword = '';
              this.signupModal.hide();
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

  showModal(): void {
    this.signupModal.show();
  }
}

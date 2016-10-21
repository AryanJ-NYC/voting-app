import { Component, Input } from '@angular/core';

import { User } from '../../users/shared/user';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'signup-modal',
  templateUrl: './signup-modal.component.html'
})

export class SignupModalComponent {
  @Input()
  user: User = new User();
  private errorMessage: string;
  private confirmPassword: string;

  constructor (private userService: UserService) { }

  signup() {
    if (this.user.password == this.confirmPassword) {
      this.userService.addUser(this.user)
        .subscribe(
          user => {
            console.log(user);
            if (res.hasOwnProperty('_id')) {
              console.log('New user!')
            }
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}

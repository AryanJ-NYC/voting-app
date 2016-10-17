import { Component, Input } from '@angular/core';

import { User } from '../../users/shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'signup-modal',
  templateUrl: './signup-modal.component.html'
})

export class SignupModalComponent {
  @Input()
  user: User = new User();

  confirmPassword: string;
  
  signup() {
    if (this.user.password == this.confirmPassword) {

    }
  }
}

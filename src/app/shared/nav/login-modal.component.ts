import { Component, Input } from '@angular/core';

import { User } from '../../users/shared/user';
import { UserService } from '../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login-modal.component.html'
})

export class LoginModalComponent {
  @Input()
  user: User = new User();
  private errorMessage: string;

  constructor (private userService: UserService) { }

  login() { }
}

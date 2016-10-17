import { Component, Input } from '@angular/core';

import { User } from '../../users/shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login-modal.component.html'
})

export class LoginModalComponent {
  @Input()
  user: User = new User();
  
  login() {
    
  }
}

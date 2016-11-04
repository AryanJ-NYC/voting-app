import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

import { User } from '../../../users/shared/user.model';
import { UserService } from '../../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login.component.html'
})

export class LoginModalComponent {
  @Input() user: User = new User();
  @Output() onSubmitted = new EventEmitter<User>();
  @ViewChild('loginModal') loginModal: ModalDirective;
  private errorMessage: string;

  constructor (private userService: UserService) { }

  private shareUser(user: User): void {
    this.userService.broadcastUser(user);
  }

  private clearErrorMessage(): void {
    this.errorMessage = '';
  }

  login() {
    this.userService.login(this.user)
        .subscribe(
            user => {
              if (user.hasOwnProperty('_id')) {
                this.shareUser(user);
                this.onSubmitted.emit(user);
                this.user = new User();
                this.loginModal.hide();
              }
            },
            error => {
              this.errorMessage = error.message;
            });
  }

  showModal(): void {
    this.loginModal.show();
  }
}

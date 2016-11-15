import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal';

import { NavService } from '../shared/nav.service';
import { User } from '../../../users/shared/user.model';
import { UserService } from '../../../users/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginModalComponent {
  @Input() user: User = new User();
  @Output() onSubmitted = new EventEmitter<User>();
  @ViewChild('loginModal') loginModal: ModalDirective;
  private errorMessage: string;

  constructor (
    private navService: NavService,
    private userService: UserService
  ) {
    this.navService.isLoginModalOpen$.subscribe(
      isOpen => {
        if (isOpen) {
          this.showModal();
        } else {
          this.hideModal();
        }
      }
    );
  }

  private shareUser(user: User): void {
    this.userService.broadcastUser(user);
  }

  private openTwitterLogin(): void {
    this.hideModal();
    this.openDialog('api/sessions/twitter', null, null, win => {
      this.userService.getSession()
        .subscribe(user => {
          if (user.hasOwnProperty('_id')) {
            this.onSubmitted.emit(this.user);
            this.shareUser(this.user);
            this.user = new User();
          }
        });
    });
  }

  private openDialog(uri, name, options, closeCallback) {
    const win = window.open(uri, name, options);
    const interval = window.setInterval(function() {
      try {
        if (win == null || win.closed) {
          window.clearInterval(interval);
          closeCallback(win);
        }
      }
      catch (e) {
      }
    }, 250);
    return win;
  };

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
                this.hideModal();
              }
            },
            error => {
              this.errorMessage = error.message;
            });
  }

  showModal(): void {
    this.loginModal.show();
  }

  hideModal(): void {
    this.loginModal.hide();
  }
}

import { Component } from '@angular/core';

import {User} from "../../users/shared/user";

@Component({
  moduleId: module.id,
  selector: 'navigation',
  templateUrl: './nav.component.html'
})

export class NavComponent {
  private isCollapsed: boolean = true;
  private user: User;

  changeUser(user: User) {
    this.user = user;
  }
}

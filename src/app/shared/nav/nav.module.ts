import { AlertModule } from 'ng2-bootstrap/components/alert';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginModalComponent } from './login-modal.component';
import { NavComponent } from './nav.component';
import { SignupModalComponent } from './signup-modal.component';

@NgModule({
  imports: [ AlertModule, CommonModule, FormsModule ],
  declarations: [ LoginModalComponent, NavComponent, SignupModalComponent ],
  exports: [ NavComponent ]
})

export class NavModule { }

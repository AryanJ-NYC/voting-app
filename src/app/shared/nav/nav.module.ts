import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModalComponent } from './login-modal.component';
import { NavComponent } from './nav.component';
import { SignupModalComponent } from './signup-modal.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ LoginModalComponent, NavComponent, SignupModalComponent ],
  exports: [ NavComponent ]
})

export class NavModule { }

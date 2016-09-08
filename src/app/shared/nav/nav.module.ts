import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModalComponent } from './login-modal.component'
import { NavComponent } from './nav.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ LoginModalComponent, NavComponent ],
  exports: [ NavComponent ]
})

export class NavModule { }

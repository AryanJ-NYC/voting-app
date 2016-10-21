import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import './rxjs-operators';

import { AppComponent }  from './app.component';
import { NavModule } from './shared/nav/nav.module';
import { UserService } from './users/shared/user.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, NavModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ UserService ]
})

export class AppModule { }

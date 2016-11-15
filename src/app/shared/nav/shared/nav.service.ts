import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {
  private isLoginModalOpen = new Subject<boolean>();
  isLoginModalOpen$ = this.isLoginModalOpen.asObservable();

  openLoginModal(flag: boolean): void {
    this.isLoginModalOpen.next(flag);
  }
}

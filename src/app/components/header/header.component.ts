import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { WindowScrolling } from 'src/app/services/utilities/window-scrolling';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: any;
  user: any;
  showModal = false;
  displayName: any;
  toggleMenu = false;
  profile$: Observable<{ data: User; ref: firestore.DocumentReference; }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private windowScrolling: WindowScrolling) { }

  async ngOnInit() {

    this.profile$ = this.authService.profile$;

  }

  logout() {
    this.authService.logout();
  }

  newUser() {
    this.openModal();
  }

  openModal() {
    this.showModal = !this.showModal;
    this.windowScrolling.disable();
  }

  closeModal(event?): void {
    this.windowScrolling.enable();
    this.showModal = false;
  }

  toggleAMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

}

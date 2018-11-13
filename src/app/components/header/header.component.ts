import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { WindowScrolling } from 'src/app/services/utilities/window-scrolling';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: any;
  user: any;
  showModal: boolean;
  displayName: any;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private windowScrolling: WindowScrolling) { }

  async ngOnInit() {
    this.user = await this.userService.isAdmin().subscribe(data => {
      this.isAdmin = data.data().admin;
      this.displayName = data.data().name;
    })
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

}

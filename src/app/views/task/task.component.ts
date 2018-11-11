import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { WindowScrolling } from 'src/app/services/utilities/window-scrolling';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  isAdmin: any;
  user: any;
  showModal: boolean;

  constructor(
    private fb: FormBuilder, 
    private authService:AuthService,
    private userService:UserService,
    private windowScrolling: WindowScrolling ) { }

  async ngOnInit() {
     this.user = await this.userService.isAdmin().subscribe( data => {
      this.isAdmin = data.data().admin;
    })

    
  }

  logout(){
    this.authService.logout();
  }

  newUser(){
    this.openModal();
  }

  openModal(){
    this.showModal = !this.showModal;
    this.windowScrolling.disable();
  }

  closeModal(event?):void{
    this.windowScrolling.enable();
    this.showModal = false;

    if(event){
      console.log(event)
    }
  }

}

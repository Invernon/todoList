import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WindowScrolling } from 'src/app/services/utilities/window-scrolling';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  @Input() data: any; 
  @Input() active : boolean = false ;
  @Output() closeModal = new EventEmitter;

  newUserForm: FormGroup


  constructor( 
    private windowScrolling: WindowScrolling,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
     ) {

      this.createUserForm();

   }

  ngOnInit() {
      
  }

  createUserForm() {
    this.newUserForm = this.fb.group({
      name: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required] ],
      admin: [false, [Validators.required] ]
    });
  }

  close(){
    this.closeModal.emit();
  }

  submitForm(){
    let user = this.newUserForm.value;

    this.authService.registerByEmailAdmin(user.email, user.password)
    .then( data => {
      this.userService.createUser( user , data );
      this.closeModal.emit();
    })
    .catch( err => {
      alert(err.message)
    })
  }

}
